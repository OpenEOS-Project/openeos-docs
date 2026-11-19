import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import Admonition from '@theme/Admonition';

/**
 * Hinweis „Bald verfügbar“ für die Cloud-TSE.
 *
 * Erscheint nur, wenn die Doku mit TSE_COMING_SOON=true gebaut wurde
 * (customFields.tseComingSoon in docusaurus.config.ts) — also für den
 * gehosteten Dienst auf openeos.de, solange die Cloud-TSE dort noch nicht
 * angeboten wird. Ohne die Variable rendert die Komponente nichts.
 */
export default function TseComingSoon(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  if (siteConfig.customFields?.tseComingSoon !== true) {
    return null;
  }
  return (
    <Admonition
      type="info"
      title={translate({
        id: 'tseComingSoon.title',
        message: 'Bald verfügbar',
        description: 'Title of the Cloud-TSE "coming soon" note',
      })}>
      <p>
        {translate({
          id: 'tseComingSoon.text',
          message:
            'Die Cloud-TSE wird gerade eingeführt und ist auf openeos.de bald verfügbar. Bis dahin kassierst du in Deutschland in „Alle Funktionen“ mit Karte und online (oder nutzt „Nur Bons“/„Bargeldlos“) – Bargeld kommt mit der Cloud-TSE.',
          description: 'Body of the Cloud-TSE "coming soon" note',
        })}
      </p>
    </Admonition>
  );
}
