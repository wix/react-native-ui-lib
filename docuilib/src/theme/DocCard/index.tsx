import React, {type ReactNode, type JSX} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';

import type {Props} from '@theme/DocCard';
import Heading from '@theme/Heading';
import type {PropSidebarItemCategory, PropSidebarItemLink} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

function CardContainer({href, children}: {href: string; children: ReactNode}): JSX.Element {
  return (
    <Link href={href} className={clsx('card padding--lg', styles.cardContainer)}>
      {children}
    </Link>
  );
}

function CardLayout({href, title}: {href: string; title: string}): JSX.Element {
  return (
    <CardContainer href={href}>
      <Heading as="h2" className={clsx('text--truncate', styles.cardTitle)} title={title}>
        {title}
      </Heading>
    </CardContainer>
  );
}

function CardCategory({item}: {item: PropSidebarItemCategory}): JSX.Element | null {
  const href = findFirstSidebarItemLink(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return <CardLayout href={href} title={item.label}/>;
}

function CardLink({item}: {item: PropSidebarItemLink}): JSX.Element {
  return <CardLayout href={item.href} title={item.label}/>;
}

export default function DocCard({item}: Props): JSX.Element {
  switch (item.type) {
    case 'link':
      return <CardLink item={item}/>;
    case 'category':
      return <CardCategory item={item}/>;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
