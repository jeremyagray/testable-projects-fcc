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

      it(`My force directed graph should have a container for the SVG
      element with a corresponding id="visualization".`, function () {
        assert.isNotNull(
          document.getElementById('visualization'),
          'Could not find an element with id="visualization" '
        );
        const element = document.getElementById('visualization').nodeName.toLowerCase();
        assert.equal(
          element,
          'div',
          `The node name for 'visualization' was ${element} and not 'DIV'.`
        );
      });

      it(`My force directed graph should have an SVG element with a
      corresponding id="canvas".`, function () {
        assert.isNotNull(
          document.getElementById('canvas'),
          'Could not find an element with id="canvas" '
        );
        const element = document.getElementById('canvas').nodeName.toLowerCase();
        assert.equal(
          element,
          'svg',
          `The node name for 'canvas' was ${element} and not 'SVG'.`
        );
      });

      it(`My force directed graph should have <circle> elements with a
      class="node" that represent each dependency.`, function () {
        const actualNodes = document.querySelectorAll('circle.node').length;
        const expectedNodes = 466;
        assert.equal(
          actualNodes,
          expectedNodes,
          `Found ${actualNodes} nodes out of ${expectedNodes} expected.`
        );
      });

      // it(`There should be at least 4 different fill colors used for
      // the cells.`, function () {
      //   const cells = document.querySelectorAll('rect.cell');

      //   assert.isTrue(
      //     hasUniqueColorsCount(cells, 4),
      //     'There should be four or more fill colors used for the cells '
      //   );
      // });

      it(`Each node will have the property "data-dependency" containing the
      corresponding dependency name.`, function () {
        const actualNodes = document.querySelectorAll('circle.node');
        const expectedNodes = 466;

        // Assert actualNodes exists to ensure the forEach runs.
        assert.equal(
          actualNodes.length,
          expectedNodes,
          `Found ${actualNodes.length} nodes out of ${expectedNodes} expected.`
        );

        actualNodes.forEach((node) => {
          assert.isNotNull(
            node.getAttribute('data-dependency'),
            'Could not find property "data-dependency" in node '
          );
        });
      });

      it(`My force directed graph should have <line> elements with a
      class="link" that represent links between dependencies.`, function () {
        const actualLinks = document.querySelectorAll('line.link').length;
        const expectedLinks = 873;
        assert.equal(
          actualLinks,
          expectedLinks,
          `Found ${actualLinks} links out of ${expectedLinks} expected.`
        );
      });

      it(`Each node will have the properties "data-source",
      "data-target", and "data-links" containing the names of the
      corresponding linked dependencies and the number of links
      between the dependencies.`, function () {
        const actualLinks = document.querySelectorAll('line.link');
        const expectedLinks = 873;

        // Assert actualLinks exists to ensure the forEach runs.
        assert.equal(
          actualLinks.length,
          expectedLinks,
          `Found ${actualLinks} links out of ${expectedLinks} expected.`
        );

        actualLinks.forEach((node) => {
          assert.isNotNull(
            node.getAttribute('data-source'),
            'Could not find property "data-source" in link '
          );
          assert.isNotNull(
            node.getAttribute('data-target'),
            'Could not find property "data-target" in link '
          );
          assert.isNotNull(
            node.getAttribute('data-links'),
            'Could not find property "data-links" in link '
          );

          const links = parseInt(node.getAttribute('data-links'));
          assert.isAtLeast(
            links,
            1,
            `The number of links ${links} should be at least 1 `
          );
        });
      });

      //   it(`The "data-month", "data-year" of each cell should be
      //   within the range of the data.`, function () {
      //     const cells = document.querySelectorAll('rect.cell');

      //     // Without this assertion, the other assertions will never be reached
      //     // (forEach loop below is never entered) and the test would falsely
      //     // pass.
      //     assert.isAbove(
      //       cells.length,
      //       0,
      //       'Could not find any <rect> elements with a class="cell" '
      //     );

      //     cells.forEach((cell) => {
      //       const dataMonth = +cell.getAttribute('data-month');

      //       assert.isAtLeast(dataMonth, 0, 'data-month should be at least 0');
      //       assert.isAtMost(dataMonth, 11, 'data-month should be at most 11');
      //     });

      //     cells.forEach((cell) => {
      //       const dataYear = +cell.getAttribute('data-year');

      //       assert.isAtLeast(dataYear, 1753, 'data-year should be at least 1753');
      //       assert.isAtMost(dataYear, 2015, 'data-year should be at most 2015');
      //     });
      //   });

      //   it(`My force directed graph should have a legend with corresponding
      //   id="legend".`, function () {
      //     assert.isNotNull(
      //       document.getElementById('legend'),
      //       'Could not find an element with id="legend" '
      //     );
      //   });

      //   it('My legend should contain <rect> elements.', function () {
      //     assert.isAbove(
      //       document.querySelectorAll('#legend rect').length,
      //       0,
      //       'Could not find <rect> elements contained by the legend element '
      //     );
      //   });

      //   it(`The <rect> elements in the legend should use at least 4
      //   different fill colors`, function () {
      //     const legendItems = document.querySelectorAll('#legend rect');

      //     assert.isTrue(
      //       hasUniqueColorsCount(legendItems, 4),
      //       'There should be four or more fill colors used for the legend '
      //     );
      //   });
    });

    // Tooltip tests.
    testToolTip(document.querySelectorAll('circle.node'), 'data-dependency', 'data-dependency');
  });
}
