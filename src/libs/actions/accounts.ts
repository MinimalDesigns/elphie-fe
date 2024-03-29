'use server'
// =============================================================================
// File Name: libs/actions/accounts.ts
// File Description:
// This file contains the code for all the Accounts Service Form actions.
// =============================================================================
// =============================================================================
// Actions Imports
// =============================================================================
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createAccount, deleteAccount, updateAccount } from '../endpoints';
import { cookies } from 'next/headers';

// =============================================================================
// Actions Form Schemas
// =============================================================================
const FormSchema = z.object({
    name: z.string(),
    type: z.string(),
    iban: z.string(),
    balance: z.string(),
});

// =============================================================================
// Actions Types
// =============================================================================
export type State = {
    errors?: {
        name?: string[],
        type?: string[],
        iban?: string[],
        balance?: string[],
    };
    message?: string | null;
};

// =============================================================================
// Actions Functions
// =============================================================================
export const accountsCreate = async (prevState: State | undefined, formData: FormData) => {

    // Validate fields
    const validatedFields = FormSchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    // Sending errors if any
    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Falied to submit form.',
        }
    }

    // Action Processes
    try {
        // Add account
        const response = await fetch(createAccount(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: cookies().get('user-id')?.value,
                name: validatedFields.data.name,
                type: validatedFields.data.type,
                iban: validatedFields.data.iban,
                balance: parseFloat(validatedFields.data.balance.replace(',', ''))
            })
        })
        const json = await response.json();

        if(!json.ok) return { message: "Failed to create Bank Account."}

    } catch (error) {
        return { message: 'Failed to create Bank Account.' }
    }

    // Redirect to and refresh main Accounts page
    revalidatePath('/app/accounts');
    redirect('/app/accounts');
}

export const accountsUpdate = async (id: string, prevState: State | undefined, formData: FormData) => {

    // Validate fields
    const validatedFields = FormSchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    // Sending errors if any
    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Falied to submit form.',
        }
    }

    // Action Processes
    try {
        // Update account
        const response = await fetch(updateAccount(id), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: validatedFields.data.name,
                type: validatedFields.data.type,
                iban: validatedFields.data.iban,
                balance: parseFloat(validatedFields.data.balance.replace(',', ''))
            })
        })
        const json = await response.json();

        if(!json.ok) return { message: "Failed to update Bank Account." }

    } catch (error) {
        return { message: 'Failed to update Bank Account.' }
    }

    // Redirect to and refresh main Accounts page
    revalidatePath('/app/accounts');
    redirect('/app/accounts');
}

export const accountsDelete = async (id: string) => {
    // Action Processes
    try {
        await fetch(deleteAccount(id), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        revalidatePath('/app/accounts');
        return {success: `Account deleted ok.`}
    } catch (error) {
        return { message: 'Failed to delete Account.' }
    }
}
