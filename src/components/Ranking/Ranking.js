import React, {
  Component,
  PropTypes,
} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ranking.css';

const tableOptions = {
  selectable: !1,
  wrapperStyle: { padding: '0 0 2em' },
};

const tableHeaderOptions = {
  displaySelectAll: !1,
  adjustForCheckbox: !1,
  style: { borderBottom: 'none' },
};

const tableBodyOptions = {
  displayRowCheckbox: !1,
};

class Ranking extends Component {
  render() {
    return (
      <div className={s.root}>
        <h1>Ranking graczy </h1>
        <table>
          <thead>
          <tr>
            <th>Pozycja</th>
            <th>Nick</th>
            <th>PD Rating</th>
            <th>Solo Rating</th>
            <th>Party Rating</th>
          </tr>
          </thead>
          <tbody>

          </tbody>
        </table>

        <p>W rankingu serwisu Dota2.pl uczestniczy każdy zarejestrowany użytkownik, którego pole <em>Solo MMR</em> w grze Dota 2 było publiczne w ciągu ostatnich 48 godzin. Ranking jest aktualizowany w systemie ciągłym <em>(z wyjątkiem momentów, gdy Dota 2 Game Coordinator jest niedostępny)</em>.</p><p> Pole <em>PD Rating</em> odzwierciedla wartość punktów rankingowych z obecnego sezonu ligi Prodota.</p>

      </div>
    );
  }
}

Ranking.propTypes = {};
Ranking.defaultProps = {};

export default withStyles(s)(Ranking);
