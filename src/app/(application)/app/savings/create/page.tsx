// =============================================================================
// File Name: (application)/app/savings/create/page.tsx
// File Description:
// This file contains the code of the Create Goal Page
// =============================================================================
// =============================================================================
// Page Imports
// =============================================================================
import { Account } from '@/libs/definitions';
import { getFilteredAccountsByUserId } from '@/libs/endpoints';
import { AppSection } from '@/ui/base/layouts';
import { FormSavings } from '@/ui/components/form-savings';
import { Metadata } from 'next'
import { cookies } from 'next/headers';

// =============================================================================
// Page Props
// =============================================================================

// =============================================================================
// Page Metadata
// =============================================================================
export const metadata: Metadata = {
    title: 'Savings Create'
}

// =============================================================================
// Page Component
// =============================================================================
export default async function SavingsCreatePage() {

    const breadcrumbs = [
        { label: 'App', href: '#', active: false },
        { label: 'Savings', href: '/app/savings', active: false },
        { label: 'Create', href: '/app/savings/create', active: true }
    ];

    // Fetch Accounts
    const accountsResponse = await fetch(getFilteredAccountsByUserId(cookies().get('user-id')?.value as string, ''), { cache: "no-cache" });
    const accountsJson = await accountsResponse.json();
    const accounts: Account[] | undefined = accountsJson.data;

    return (
        <AppSection breadcrumbs={breadcrumbs} heading={'Create Savings'} subheading={'Here you can create a new Savings.'} isTableSection={false} createAction={'#'}>
            <FormSavings id={'form-savings-create'} action={'create'} buttonText={'Create Savings'} accounts={accounts!}/>
        </AppSection>
    )
}