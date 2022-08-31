import { h, Fragment } from 'preact';
import Header from '@components/header';
import Main from '@components/main';
import LogoLink from '@components/logo-link';
import Title from '@components/title';
import Footer from '@components/footer';

const Default = ({ children }) => <Fragment>
    <Header>
        <LogoLink />
        <Title>UI Patterns</Title>
    </Header>
    <Main>
        <div class="page">
            { children }
        </div>
    </Main>
    <Footer />
</Fragment>;

export default Default;