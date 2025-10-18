# Animation Issue Summary for GPT

## Problem
Custom CSS `@keyframes` animations are NOT working in Astro project, despite being:
- ✅ Defined in multiple places
- ✅ Visible in HTML (via inline script)
- ✅ Console shows they exist
- ❌ BUT NOT TRIGGERING/RUNNING

## What's Working
- ✅ Tailwind built-in animations (`fade-in-up`, `slide-in`)
- ✅ Hover transitions (scale, rotate)
- ✅ Static styles
- ✅ Test HTML file (`test-animation.html`) - ANIMATIONS WORK PERFECTLY

## What's NOT Working
- ❌ PhoneButton: `bounce-spring`, `gradient-shift`, `glow-pulse`, `ring-rotate`
- ❌ WhatsAppButton: `float-smooth`
- ❌ BrandLogos: `rotate-continuous` (spinning border)
- ❌ Why Us background: animated stars (`glow-pulse`)

## What We Tried (ALL FAILED)
1. ❌ `global.css` with `@keyframes`
2. ❌ `BaseLayout.astro` with `<style is:global>`
3. ❌ `BaseLayout.astro` with `<script is:inline>` injecting styles
4. ❌ React component `useEffect` injecting styles
5. ❌ React module-level style injection
6. ❌ Tailwind config keyframes
7. ❌ React `key` prop for force re-render
8. ❌ React `mounted` state trigger
9. ❌ Moving script to HEAD beginning
10. ❌ Manual Console injection - styles added but animations DON'T START

## Key Files
- `src/layouts/BaseLayout.astro` - Main layout with inline script
- `src/components/common/PhoneButton.tsx` - React component with inline animation styles
- `src/components/common/WhatsAppButton.tsx` - React component
- `src/components/home/BrandLogos.tsx` - Logo component
- `test-animation.html` - **WORKING** test file (same keyframes, pure HTML)

## Console Tests Done
- ✅ `document.getElementById('critical-animations')` - EXISTS
- ✅ `getComputedStyle(...).animation` - Shows `'1e-05s ease-in-out 0s 1 normal none running bounce'`
- ✅ Manual keyframe injection - ADDED but NOT RUNNING

## User Reports
- "When I scroll, WhatsApp button WAS animated briefly" (Hot Module Reload?)
- "Everything works in test HTML"
- "Tailwind animations work fine"
- "During your work, animations appeared for a moment" (HMR?)

## Hypothesis
Something about Astro + React hydration + CSS keyframes timing is broken.
Keyframes are DEFINED but NOT TRIGGERING on page load or after hydration.

## Next Steps for GPT
1. Check if this is a known Astro + React Islands animation bug
2. Try different hydration strategy?
3. Try wrapping animations in `<style>` tag INSIDE component?
4. Check if `will-change` or `transform: translateZ(0)` helps
5. Check if animation-delay or animation-fill-mode needed
6. Consider using CSS Variables instead of inline styles?

## Environment
- Astro 4.16.19
- React 18.3.1
- Tailwind 3.4.11
- Node 20
- Windows 10


