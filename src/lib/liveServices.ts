import { appConfig, hasCivicKey, hasGroqKey } from './config';
import { buildAssistantReply, buildMapUrl, buildPollingPlaces, type PollingPlace, type UserProfile } from './electionPlanner';
import type { ChatMessage } from './storage';

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export type PollingLookupResult = {
  source: 'live' | 'mock';
  note: string;
  places: PollingPlace[];
  electionName?: string;
  electionDay?: string;
  mapUrl: string;
  embedUrl?: string | null;
};

export type TranslationResult = {
  text: string;
  source: 'local';
};

const fallbackTranslations: Record<string, string> = {
  en: 'ElectED helps people understand voting, find local guidance, and stay ready.',
  hi: 'ElectED लोगों को मतदान समझने, स्थानीय मार्गदर्शन पाने और तैयार रहने में मदद करता है।',
  mr: 'ElectED लोकांना मतदान समजून घेणे, स्थानिक मार्गदर्शन मिळवणे आणि तयार राहणे यामध्ये मदत करते.',
  gu: 'ElectED લોકોને મતદાન સમજવામાં, સ્થાનિક માર્ગદર્શન મેળવવામાં અને તૈયાર રહેવામાં મદદ કરે છે.',
  bn: 'ElectED মানুষকে ভোটদান বুঝতে, স্থানীয় নির্দেশনা পেতে এবং প্রস্তুত থাকতে সাহায্য করে।',
  ta: 'ElectED மக்களுக்கு வாக்களிப்பைப் புரிந்துகொள்ள, உள்ளூர் வழிகாட்டுதலைப் பெற, மற்றும் தயாராக இருக்க உதவுகிறது.',
  te: 'ElectED ప్రజలకు ఓటింగ్‌ను అర్థం చేసుకోవడంలో, స్థానిక మార్గదర్శకత పొందడంలో, మరియు సిద్ధంగా ఉండడంలో సహాయపడుతుంది.',
  kn: 'ElectED ಜನರಿಗೆ ಮತದಾನವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು, ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆಯಲು ಮತ್ತು ಸಿದ್ಧರಾಗಿರಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
  ml: 'ElectED ആളുകൾക്ക് വോട്ടിംഗ് മനസ്സിലാക്കാനും, പ്രാദേശിക മാർഗനിർദേശം നേടാനും, തയ്യാറാകാനും സഹായിക്കുന്നു.',
  pa: 'ElectED ਲੋਕਾਂ ਨੂੰ ਵੋਟਿੰਗ ਸਮਝਣ, ਸਥਾਨਕ ਰਹਿਨੁਮਾਈ ਲੈਣ, ਅਤੇ ਤਿਆਰ ਰਹਿਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।',
};

function electionTypeLabel(profile: UserProfile) {
  if (profile.electionType === 'state-assembly') {
    return 'state assembly election';
  }

  if (profile.electionType === 'local-body') {
    return 'local body election';
  }

  return 'general election';
}

export async function getAssistantReply(messages: ChatMessage[], profile: UserProfile): Promise<string> {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content ?? '';

  if (!hasGroqKey()) {
    return buildAssistantReply(latestUserMessage, profile);
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appConfig.groqApiKey}`,
      },
      body: JSON.stringify({
        model: appConfig.groqModel,
        messages: [
          {
            role: 'system',
            content: [
              'You are ElectED 2.0, a nonpartisan civic guide for India.',
              'Help with registration, voting logistics, deadlines, polling places, and election basics.',
              'Do not recommend a party or candidate.',
              `The user profile is for ${profile.state}, ${electionTypeLabel(profile)}, and a ${profile.experience} voter.`,
            ].join(' '),
          },
          ...messages.map((message) => ({
            role: message.role === 'assistant' ? 'assistant' : 'user',
            content: message.content,
          })),
        ],
        temperature: 0.4,
        max_tokens: 450,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq request failed with ${response.status}`);
    }

    const data = (await response.json()) as GroqResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();

    return reply || buildAssistantReply(latestUserMessage, profile);
  } catch {
    return buildAssistantReply(latestUserMessage, profile);
  }
}

export async function lookupPollingPlaces(profile: UserProfile, address: string): Promise<PollingLookupResult> {
  const fallbackPlaces = buildPollingPlaces(profile, address);
  const mapUrl = buildMapUrl(profile, address);

  if (!hasCivicKey() || !address.trim()) {
    return {
      source: 'mock',
      note: hasCivicKey()
        ? 'Enter an address to query the Civic API. Showing fallback data until then.'
        : 'Google Civic API key is not set yet, so mock civic data is active.',
      places: fallbackPlaces,
      mapUrl,
      embedUrl: buildMapsEmbedUrl(address || profile.state),
    };
  }

  try {
    const electionsResponse = await fetch(`https://www.googleapis.com/civicinfo/v2/elections?key=${appConfig.googleCivicApiKey}`);

    if (!electionsResponse.ok) {
      throw new Error(`Elections lookup failed with ${electionsResponse.status}`);
    }

    const electionsData = (await electionsResponse.json()) as { elections?: Array<{ id: number; name: string; electionDay: string }> };
    const election = electionsData.elections?.[0];

    if (!election) {
      return {
        source: 'mock',
        note: 'No upcoming election was returned, so the app is showing fallback civic data.',
        places: fallbackPlaces,
        mapUrl,
        embedUrl: buildMapsEmbedUrl(address || profile.state),
      };
    }

    const voterInfoResponse = await fetch(
      `https://www.googleapis.com/civicinfo/v2/voterinfo?address=${encodeURIComponent(address)}&electionId=${election.id}&key=${appConfig.googleCivicApiKey}`,
    );

    if (!voterInfoResponse.ok) {
      throw new Error(`Voter info lookup failed with ${voterInfoResponse.status}`);
    }

    const voterInfo = (await voterInfoResponse.json()) as {
      pollingLocations?: Array<{
        address?: {
          locationName?: string;
          line1?: string;
          line2?: string;
          city?: string;
          state?: string;
          zip?: string;
        };
        pollingHours?: string;
      }>;
    };

    const livePlaces = (voterInfo.pollingLocations ?? []).slice(0, 3).map((location, index) => {
      const addressLine = [location.address?.line1, location.address?.line2, location.address?.city, location.address?.state, location.address?.zip]
        .filter(Boolean)
        .join(', ');

      return {
        name: location.address?.locationName ?? `${profile.state} polling place ${index + 1}`,
        address: addressLine || address || `${profile.state} civic address`,
        hours: location.pollingHours ?? 'Election day hours from live civic data',
        distance: index === 0 ? 'Nearby' : `${(index + 1) * 1.4} km`,
      } satisfies PollingPlace;
    });

    return {
      source: 'live',
      note: `Live civic data loaded for ${election.name}.`,
      places: livePlaces.length > 0 ? livePlaces : fallbackPlaces,
      electionName: election.name,
      electionDay: election.electionDay,
      mapUrl,
      embedUrl: buildMapsEmbedUrl(address || profile.state),
    };
  } catch {
    return {
      source: 'mock',
      note: 'Live civic data could not be loaded, so fallback polling places are shown instead.',
      places: fallbackPlaces,
      mapUrl,
      embedUrl: buildMapsEmbedUrl(address || profile.state),
    };
  }
}

export function buildMapsEmbedUrl(address: string): string | null {
  const query = encodeURIComponent(address.trim() || 'Maharashtra polling booth');
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

export async function translateSnippet(text: string, targetLanguage: string): Promise<TranslationResult> {
  if (targetLanguage === 'en') {
    return {
      text,
      source: 'local',
    };
  }

  return {
    text: fallbackTranslations[targetLanguage] ?? text,
    source: 'local',
  };
}
