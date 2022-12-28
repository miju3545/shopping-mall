import React from 'react';

import gnbLinks from '../data/gnbLinks';
import { Link } from 'react-router-dom';

export default function Gnb() {
  return (
    <nav className="gnb">
      <ul>
        {gnbLinks.map((link) => (
          <li key={link.name}>
            <Link to={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
