# Hero reference adaptation QA

Source visual truth: user-supplied bookstore screenshot in the current conversation (940 × 1600 pixels). Scope: hero composition and category strip only. Existing navigation and the rest of BookNook remain outside this change.

Implementation evidence: /tmp/booknook-discovery-desktop.png (940 × 1000 CSS viewport screenshot); /tmp/booknook-discovery-mobile.png (390 × 844 CSS viewport screenshot). Both browser-rendered; screenshots compared at their displayed CSS size. Source hero region and implementation hero were reviewed at 940px width. The source includes a taller commerce header; section boundaries were aligned conceptually rather than treating that header offset as a hero mismatch.

State: homepage, signed out, demo catalog, first featured collection.

## Findings and comparison history

- Initial P1: the image grid's intrinsic image heights expanded the middle column and pushed the main feature far below the heading. Fixed grid rows using minmax(0, …), and removed intrinsic minimum heights on the photo cards. The subsequent desktop screenshot shows aligned card bottoms, a low left feature, stacked middle cards, and tall right photo.
- Post-fix review: no actionable P0/P1/P2 issues within the requested adaptation. Main actions and photo captions are readable; mobile uses a full-width feature followed by two columns, then a three-column category strip. No horizontal viewport overflow at 390px.

## Required fidelity surfaces

- Typography: existing Bricolage Grotesque retained for BookNook; compact left-aligned two-line desktop heading, smaller supporting paragraph on the right. Mobile heading wraps naturally. Captions use white type over darkened photography.
- Spacing/layout: reference's staggered three-column composition retained, with aligned photo-card bottoms and separate category tiles. Rounded corners and restrained borders follow existing tokens.
- Colors/tokens: intentional use of BookNook yellow and charcoal for actions instead of reference orange. Pale neutral section background matches the reference direction.
- Image quality: three generated editorial photographs optimized as WebP. Bookshelf, reader, and armchair subjects fit the slots; no generated artwork replaces original catalog covers. All hero image elements loaded in browser.
- Copy/content: shopping, discounts and newsletter replaced with library discovery and a working title/author search. Counts derive from actual catalog records; existing categories retained rather than inventing unsupported categories.

Full-view evidence: desktop screenshot compared with supplied reference for split heading, staggered mosaic, aligned card bottoms and category rhythm. Focused review: photo captions, search controls and mobile grid inspected at readable size in browser screenshots.

## Verification

- Production build and TypeScript passed.
- Featured science button changes the active slide and pressed state; fiction button restores first slide.
- Search for Little navigates to /books?q=Little.
- Science category tile opens /books?category=Science; Science filter selected, one matching book rendered.
- Mobile 390px: no horizontal overflow; caption and input layout inspected.
- Browser error log checked after assets installed: no error entries.

## Follow-up polish

P3: category tiles currently share the existing book icon; distinct category icons could be added later.

final result: passed
