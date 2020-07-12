import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { leftArrow, rightArrow } from '../utils/assets';

const yearInputStyle = { textAlign: 'center' };

export default class MonthsViewHeading extends Component {
  static propTypes = {
    year: PropTypes.object.isRequired,
    onNextYear: PropTypes.func.isRequired,
    onPrevYear: PropTypes.func.isRequired
  };

  static contextTypes = {
    styles: PropTypes.object
  };

  handleYearChange = event => {
    const newYear = event.target.value;

    this.props.setYear(Number(newYear));
  };

  render() {
    const { year, styles } = this.props;
    console.log('year', year);

    return (
        <div className={styles.heading}>
        <span className={styles.title}>
          <input
            value={`${Number(year.format('jYYYY'))}`}
            onChange={this.handleYearChange}
            style={styles.yearInputStyle || yearInputStyle}
          />
        </span>
          <button
            type="button"
            title="سال قبل"
            style={styles.navButton}
            className={styles.prev}
            onClick={this.props.onPrevYear}
            dangerouslySetInnerHTML={rightArrow}
            />
          <button
            type="button"
            title="سال بعد"
            style={styles.navButton}
            className={styles.next}
            onClick={this.props.onNextYear}
            dangerouslySetInnerHTML={leftArrow}
            />
        </div>
    );
  }
}
