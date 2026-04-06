---
trigger: always_on
---

Data Integration Rule (Mandatory):

All integrations MUST use:

- Server Actions for mutations
- SWR for client-side data consumption

Never use:

❌ fetch directly in Client Components  
❌ axios inside components  
❌ useEffect for data fetching  
❌ React Query  
❌ Direct REST calls in UI  

Mandatory Pattern:

1) All mutations MUST be implemented as Server Actions.

Server Actions must:

- Be async
- Be defined in server files
- Handle external API integration
- Return typed responses
- Handle errors safely

Example location:

/actions/[entity]/[action].ts

Example:

/actions/user/createUser.ts  
/actions/post/updatePost.ts  


2) All data consumption in Client Components MUST use SWR.

SWR Responsibilities:

- Fetch data from Server Actions
- Handle caching
- Handle revalidation
- Handle loading state
- Handle error state

Mandatory SWR Usage:

- Always use SWR hooks
- Always define fetchers
- Always handle loading and error states
- Never fetch data manually

Example Pattern:

Server Action:

export async function getUsers() {
  // fetch external API
}

Client Component:

const { data, error, isLoading } = useSWR(
  'users',
  getUsers
)

3) Server Components MUST fetch data directly using async/await.

Server Components:

- Can call Server Actions directly
- Must NOT use SWR
- Must NOT use useEffect

All SWR keys MUST be:

- Stable
- Predictable
- String-based
- Based on resource identity

Examples:

'useUsers'
'user-${id}'
'posts?page=1'

Never use:

❌ random keys  
❌ object keys without serialization 