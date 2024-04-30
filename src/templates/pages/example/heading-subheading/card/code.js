import { h, Fragment } from 'preact';

const Card = () => <Fragment>
    <article class="card">
        <hgroup class="card__header">
            <h2 class="card__title">Lorem ipsum dolor sit amet</h2>
            <p class="card__subtitle" aria-roledescription="subtitle">Mauris consectetur varius ullamcorper. Aliquam erat volutpat.</p>
        </hgroup>
        <div class="card__body">
            <p>Cras quis posuere sem. Phasellus sit amet convallis tellus, a sollicitudin nulla. Mauris aliquam felis ac nunc tempor, non vehicula ipsum congue. Vestibulum quis consectetur leo. Vestibulum tincidunt vestibulum turpis quis facilisis. Ut viverra est mi. Nullam ac tincidunt orci. Donec at imperdiet neque.</p>
            <a href="#" class="btn card__btn" aria-label="Read more about Lorem ipsum dolor sit amet">Read more</a>
        </div>
    </article>
</Fragment>;

export default Card;

