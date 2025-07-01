'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/space';

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      console.log('[DEBUG] Starting Google login process');
      console.log('[DEBUG] Original callbackUrl:', callbackUrl);
      
      let absoluteCallback;
      try {
        if (callbackUrl.startsWith('http')) {
          absoluteCallback = callbackUrl;
        } else {
          const baseUrl = window.location.origin;
          
          const path = callbackUrl.startsWith('/') ? callbackUrl : `/${callbackUrl}`;
          absoluteCallback = `${baseUrl}${path}`;
        }
        
        console.log('[DEBUG] Constructed absoluteCallback:', absoluteCallback);
      } catch (urlError) {
        console.error('[DEBUG] Error constructing callback URL:', urlError);
        
        absoluteCallback = '/space';
        console.log('[DEBUG] Using fallback callback URL:', absoluteCallback);
      }
      
      console.log('[DEBUG] Calling signIn with callbackUrl:', absoluteCallback);
      await signIn('google', { callbackUrl: absoluteCallback });
    } catch (error) {
      console.error('[DEBUG] Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-1/2 bg-primary lg:flex flex-col items-center justify-center p-12 relative">
        <div className="absolute top-8 left-8">
          <Image src="/logo.svg" alt="Lurna AI Logo" width={120} height={40} />
        </div>
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to Lurna AI</h1>
          <p className="text-lg text-white/80 mb-8">
            Your ultimate learning companion powered by artificial intelligence. Sign in to continue your learning journey.
          </p>
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            <Image 
              src="/globe.svg" 
              alt="Learning Illustration" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

     
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-6 lg:hidden">
              <Image src="/logo.svg" alt="Lurna AI Logo" width={120} height={40} />
            </div>
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Continue your learning journey with Lurna AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full py-6 text-base flex items-center justify-center gap-3 hover:bg-gray-50"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
              ) : (
                <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" width={20} height={20} />
              )}
              Sign in with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secured by NextAuth
                </span>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              By signing in, you agree to our 
              <Button variant="link" className="p-0 pl-1 h-auto">Terms of Service</Button>
              {' '}and{' '}
              <Button variant="link" className="p-0 pl-1 h-auto">Privacy Policy</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
