import { d3ProjectStackNoAxes } from '../utils/shared-test-strings';
import { hasUniqueColorsCount } from '../utils/element-utils';

import { assert } from 'chai';
import { testToolTip } from '../utils/global-D3-tests';

export default function createForceDirectedGraphTests() {
  describe('#ForceDirectedGraphTests', function () {
    describe('#Technology Stack', function () {
      it(d3ProjectStackNoAxes, function () {
        return true;
      });
    });

    describe('#Content', function () {
      it(`My force directed graph should have a title with a corresponding
      id="title".`, function () {
        assert.isNotNull(
          document.getElementById('title'),
          'Could not find an element with id="title" '
        );
      });

      it(`My force directed graph should have a description with a corresponding
      id="description".`, function () {
        assert.isNotNull(
          document.getElementById('description'),
          'Could not find an element with id="description" '
        );
      });

      it(`My force directed graph should have an SVG element with a corresponding
      id="visualization".`, function () {
        assert.isNotNull(
          document.getElementById('visualization'),
          'Could not find an element with id="visualization" '
        );
      });

      it(`My force directed graph should have <rect> elements with a class="cell"
      that represent the data.`, function () {
        assert.isAbove(
          document.querySelectorAll('rect.cell').length,
          0,
          'Could not find any <rect> elements with a class="cell" '
        );
      });

      it(`There should be at least 4 different fill colors used for
      the cells.`, function () {
        const cells = document.querySelectorAll('rect.cell');

        assert.isTrue(
          hasUniqueColorsCount(cells, 4),
          'There should be four or more fill colors used for the cells '
        );
      });

      it(`Each cell will have the properties "data-month",
      "data-year", "data-temp" containing their corresponding month, year, and
      temperature values.`, function () {
        const cells = document.querySelectorAll('rect.cell');

        // Without this assertion, the other assertions will never be reached
        // (forEach loop below is never entered) and we would get a false
        // positive for the overall test.
        assert.isAbove(
          cells.length,
          0,
          'Could not find any <rect> elements with a class="cell" '
        );

        cells.forEach((cell) => {
          assert.isNotNull(
            cell.getAttribute('data-month'),
            'Could not find property "data-month" in cell '
          );
          assert.isNotNull(
            cell.getAttribute('data-year'),
            'Could not find property "data-year" in cell '
          );
          assert.isNotNull(
            cell.getAttribute('data-temp'),
            'Could not find property "data-temp" in cell '
          );
        });
      });

      it(`The "data-month", "data-year" of each cell should be
      within the range of the data.`, function () {
        const cells = document.querySelectorAll('rect.cell');

        // Without this assertion, the other assertions will never be reached
        // (forEach loop below is never entered) and the test would falsely
        // pass.
        assert.isAbove(
          cells.length,
          0,
          'Could not find any <rect> elements with a class="cell" '
        );

        cells.forEach((cell) => {
          const dataMonth = +cell.getAttribute('data-month');

          assert.isAtLeast(dataMonth, 0, 'data-month should be at least 0');
          assert.isAtMost(dataMonth, 11, 'data-month should be at most 11');
        });

        cells.forEach((cell) => {
          const dataYear = +cell.getAttribute('data-year');

          assert.isAtLeast(dataYear, 1753, 'data-year should be at least 1753');
          assert.isAtMost(dataYear, 2015, 'data-year should be at most 2015');
        });
      });

      it(`My force directed graph should have a legend with corresponding
      id="legend".`, function () {
        assert.isNotNull(
          document.getElementById('legend'),
          'Could not find an element with id="legend" '
        );
      });

      it('My legend should contain <rect> elements.', function () {
        assert.isAbove(
          document.querySelectorAll('#legend rect').length,
          0,
          'Could not find <rect> elements contained by the legend element '
        );
      });

      it(`The <rect> elements in the legend should use at least 4
      different fill colors`, function () {
        const legendItems = document.querySelectorAll('#legend rect');

        assert.isTrue(
          hasUniqueColorsCount(legendItems, 4),
          'There should be four or more fill colors used for the legend '
        );
      });
    });

    // Tooltip tests.
    testToolTip(document.querySelectorAll('.cell'), 'data-year', 'data-year');
  });
}
