import React, { useState, useEffect } from 'react';
import { AuthFlowType, B2BProducts, StytchB2BUIConfig, StytchEventType } from '@stytch/vanilla-js';
import { StytchB2B } from '@stytch/nextjs/b2b';
import { useRouter } from 'next/router';
import { updateMemberPostCreate } from '../lib/api';

const Discovery = () => {
  const [config, setConfig] = useState<StytchB2BUIConfig | null>();
  const router = useRouter();

  useEffect(() => {
    setConfig({
      products: [B2BProducts.emailMagicLinks],
      sessionOptions: { sessionDurationMinutes: 60 },
      emailMagicLinksOptions: {
        discoveryRedirectURL: `${window.location.origin}/discovery`,
      },
      authFlowType: AuthFlowType.Discovery,
    });
  }, []);

  return config ? (
    <StytchB2B
      config={config}
      callbacks={{
        onEvent: async ({ type, data }) => {
          // eslint-disable-next-line no-console
          console.log(type, data);
          if (type === StytchEventType.B2BDiscoveryIntermediateSessionExchange) {
            router.push(`/${data.organization.organization_slug}/dashboard`);
          } else if (type === StytchEventType.B2BDiscoveryOrganizationsCreate) {
            await updateMemberPostCreate();
            router.push(`/${data.organization.organization_slug}/dashboard`);
          }
        },
      }}
    />
  ) : null;
};

export default Discovery;
