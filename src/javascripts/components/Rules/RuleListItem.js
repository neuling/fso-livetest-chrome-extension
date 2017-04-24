import React from 'react';
import classNames from 'classnames';

import { configurableKeyMatcher } from './../../utils/configurableRules';

export default function RulesListItem(props) {
  const { name, body, id, status, onViewClick, onDeleteClick, onStatusClick, index, defaultRule } = props;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const configurable = body.match(configurableKeyMatcher());

  return (
    <tr className={classNames('rule', { disabled: status === 'disabled' })}>
      <td className="RuleTable-ruleName">
        <a onClick={onViewClick}><h3>{name} {configurable ? '(configurable)' : null}</h3><span>#{capitalizeFirstLetter(id)} / Index: {index}</span></a>
        <div>
          {<button className="Button Button--haptic" onClick={onViewClick}>View</button>}
        </div>
      </td>
      <td className="RuleTable-ruleActions">
        <button className="Button Button--haptic" onClick={onStatusClick}>{status === 'enabled' ? 'disable' : 'enable'}</button>
        {!defaultRule && <button className="Button Button--haptic" onClick={onDeleteClick}>Delete</button>}
      </td>
    </tr>
  );
}
