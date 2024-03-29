// =============================================================================
// File Name: (website)/register/page.tsx
// File Description:
// This file contains the code of the Register Page of the Website.
// =============================================================================
// =============================================================================
// Page Imports
// =============================================================================
import { HeadingSmall } from '@/ui/elements/headings'
import { Paragraph } from '@/ui/elements/paragraphs'
import { Section } from '@/ui/base/layouts'
import Link from 'next/link'
import { Metadata } from 'next'
import { FormRegister } from '@/ui/components/form-register'

// =============================================================================
// Page Metadata
// =============================================================================
export const metadata: Metadata = {
    title: 'Register'
}

// =============================================================================
// Page Component
// =============================================================================
export default function RegisterPage() {
    return (
        <main>
            <Section id={'login-section'} containerStyles={'pt-[80px] sm:pt-[40px] lg:pt-[24px]'}>

            {/* Register Card */}
            <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[800px] mx-auto ">

                {/* Title */}
                <div className="text-center">
                    <HeadingSmall level={1} title={'Login'}>Sign up</HeadingSmall>
                    <Paragraph styles={'mt-4'}>
                    Already have an account?<span> </span>
                        <Link className="text-indigo-500 font-medium hover:underline" href="/login">Sign in here</Link>
                    </Paragraph>
                </div>
                {/* End Title */}
                    
                {/* Form */}
                <FormRegister/>
            </div>
            </Section>
        </main>
    )
}