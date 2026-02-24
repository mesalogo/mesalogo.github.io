import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './download.module.css';

export default function Download(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Download"
      description="Download MesaLogo">
      <header className={clsx('hero hero--primary', styles.downloadHero)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            Download MesaLogo
          </Heading>
          <p className="hero__subtitle">
            Get the latest version of MesaLogo
          </p>
        </div>
      </header>
      <main>
        <section className={styles.downloadSection}>
          <div className="container">
            <div className={styles.downloadCard}>
              <Heading as="h2">MesaLogo Latest Release</Heading>
              <p>
                Download the latest version from our update server. The package includes all components needed to run MesaLogo.
              </p>
              <div className={styles.downloadButton}>
                <Link
                  className="button button--primary button--lg"
                  href="https://update-mesalogo.digiman.live">
                  Go to Download Page
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
