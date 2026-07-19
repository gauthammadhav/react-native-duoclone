# PostHog post-wizard report

The wizard completed the PostHog integration for this Expo React Native app. The existing root PostHog client uses public Expo environment variables, captures app lifecycle events, supports touch autocapture, manually tracks Expo Router screens, and identifies authenticated Clerk users with their stable Clerk ID. This run verified the Expo-compatible SDK dependencies, refreshed the public PostHog environment configuration, and added completion and error instrumentation to the email-code and Google authentication paths. Custom event properties contain only the authentication method; no email, name, or other PII is sent with events.

| Event name | Description | File |
| --- | --- | --- |
| `sign_in_completed` | Captures a successful email-code or Google sign-in, segmented by authentication method. | `src/app/(auth)/sign-in.tsx` |
| `sign_up_completed` | Captures a successful email-password or Google registration, segmented by authentication method. | `src/app/(auth)/sign-up.tsx` |

## Next steps

The wizard created the following PostHog artifacts:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/519011/dashboard/1871041)
- [Authentication completions (wizard) insight](https://us.posthog.com/project/519011/insights/WJpvqVuW)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN` and `EXPO_PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.

### Agent skill

An agent skill folder remains in the project for future agent development, helping Claude Code use the current PostHog integration guidance.
