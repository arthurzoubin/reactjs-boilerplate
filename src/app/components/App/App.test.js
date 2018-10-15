/*eslint-disable */

import DocumentMeta from 'react-helmet';
import App from './App';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import styles from './App.module.scss';

describe('App Component', function() {
  beforeEach(()=> {
    this.tree = shallow(<App />);
  });

  it('renders a div tag with className at rootNode', ()=> {
    expect(this.tree.hasClass(styles.app)).to.eql(true);
  });

  it('renders a Helmet document meta as firtChild', ()=> {
    const firstChild = this.tree.childAt(0)
    expect(firstChild).to.have.type(DocumentMeta);
  });

  it('renders a main.content as third child', ()=> {
    const third = this.tree.childAt(2);
    expect(third).to.have.type('main');
    expect(third).to.have.className(styles.content);
  });

  describe('Main', () => {
    it('renders the children in a main', ()=> {
      const children = <p><span>test</span><span>child</span></p>;
      const content = shallow(<App>{children}</App>).find('main');

      expect(content.containsMatchingElement(children)).to.eql(true);
    });
  });
});
