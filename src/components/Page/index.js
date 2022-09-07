import PropTypes from 'prop-types';
import './page.scss';

const Page = ({ children }) => (
  <main className="page">
    {children}
  </main>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
