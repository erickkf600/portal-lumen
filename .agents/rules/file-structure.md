---
trigger: always_on
---

File Structure (Mandatory):

All files MUST follow the App Router structure.

Root Structure:

app/
  components/        → Shared reusable components
  actions/           → Server Actions
  [page]/            → Route segment
    page.tsx
    layout.tsx
    loading.tsx
    error.tsx


Component Location Rules (Mandatory):

All reusable UI components MUST be created inside:

app/components/

Never create shared components inside route folders unless they are strictly route-specific.

Correct:

app/components/Header/Header.tsx  
app/components/Card/Card.tsx  
app/components/Button/Button.tsx  

Incorrect:

❌ app/home/Header.tsx  
❌ app/dashboard/components/Card.tsx  
❌ components/Header.tsx (outside app)


Component Organization Pattern:

Components MUST follow folder-based structure:

app/components/
  Header/
    Header.tsx
    Header.module.scss (or styling pattern defined in rules)

  Card/
    Card.tsx
    Card.module.scss

  Button/
    Button.tsx
    Button.module.scss


Route-Specific Components:

If a component is used ONLY inside a specific route,
it MUST be colocated inside that route folder.

Example:

app/dashboard/
  page.tsx
  DashboardCard.tsx

This is allowed ONLY when:

- The component is not reusable
- The component belongs exclusively to that route


Server Actions Location (Mandatory):

All Server Actions MUST be created inside:

app/actions/

Structure:

app/actions/
  user/
    createUser.ts
    updateUser.ts
    getUser.ts

  post/
    createPost.ts
    deletePost.ts


Routing Convention (Mandatory):

All route pages MUST follow the App Router pattern:

/[page]/page.tsx


Examples:

Home page:
- Route: /home
- File: /home/page.tsx

Dashboard page:
- Route: /dashboard
- File: /dashboard/page.tsx

Profile page:
- Route: /profile
- File: /profile/page.tsx


Rules:

- Whenever requested to implement or modify a specific page,
  the implementation MUST occur inside:

  /[page]/page.tsx

- Never create pages outside this pattern.

- Do not create alternative structures such as:

  ❌ pages/home.tsx  
  ❌ app/home.tsx
  ❌ app/(pages)/home.tsx (unless explicitly defined)

- Layout-specific logic must be placed in:

  /[page]/layout.tsx

- Loading states must be placed in:

  /[page]/loading.tsx

- Error states must be placed in:

  /[page]/error.tsx


Component Import Rule (Mandatory):

All shared components MUST be imported using absolute paths.

Example:

import Header from '@/app/components/Header/Header'
import Card from '@/app/components/Card/Card'

Never use relative imports for shared components:

❌ ../../components/Header/Header


Component Organization Pattern (Mandatory)

Components MUST follow folder-based structure
and MUST use index.tsx as the component entry file.

Each component MUST be placed inside its own folder,
and the main component file MUST always be named:

index.tsx

Examples: 

 Header/
    index.tsx

Component Naming Rule:

All component folders MUST use PascalCase.

Examples:

Header
Card
UserAvatar
DashboardStats


