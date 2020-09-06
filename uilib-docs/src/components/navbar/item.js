import React from 'react';
import Link from 'gatsby-link';
import _ from 'lodash';
import classnames from 'classnames';

export default ({id, link, components, currentPage}) => {
  const hasChildren = _.size(components) > 1;

  if (!hasChildren) {
    return <ItemEntry id={id} link={link} currentPage={currentPage} />;
  } else {
    return (
      <li key={id}>
        <Link key={id} to={`/docs/${id}/`}>
          <span class={classnames('entry', {selected: id === currentPage})}>
            {id}
          </span>
        </Link>

        <ul class="nested">
          {_.map(_.filter(components, c => c.node.displayName !== id), c => {
            return (
              <ItemEntry id={c.node.displayName} currentPage={currentPage} />
            );
          })}
        </ul>
      </li>
    );
  }
};

const ItemEntry = ({id, link, currentPage}) => {
  return (
    <li key={id}>
      <Link key={id} to={link || `/docs/${id}/`}>
        <span class={classnames('entry', {selected: id === currentPage})}>
          {id}
        </span>
      </Link>
    </li>
  );
};
