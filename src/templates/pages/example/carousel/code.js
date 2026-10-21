const ITEMS = [
    { title: 'Planning your visit', summary: 'Opening times, ticket prices and what to bring.' },
    { title: 'Accessibility', summary: 'Step-free routes, quiet spaces and assistance dogs.' },
    { title: 'Getting here', summary: 'Bus, train and cycle routes to the main entrance.' },
    { title: 'Parking and drop-off', summary: 'Blue badge spaces, coach parking and charging points.' },
    { title: 'Food and drink', summary: 'Cafés, picnic areas and dietary requirements.' },
    { title: 'Group bookings', summary: 'Discounts and guided tours for groups of ten or more.' },
    { title: 'Frequently asked questions', summary: 'Answers to the questions we are asked most often.' }
];

const Card = ({ title, summary }) => <div class="carousel__card">
    <svg class="carousel__card-img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="720" height="405" viewBox="0 0 720 405">
        <rect fill="#ddd" width="720" height="405" />
    </svg>
    <div class="carousel__card-bd">
        <h3 class="carousel__card-heading"><a class="carousel__link" href="#">{title}</a></h3>
        <p>{summary}</p>
    </div>
</div>;

const Code = () => <section class="carousel js-carousel" aria-labelledby="carousel-heading">
    <div class="carousel__hd">
        <div>
            <h2 class="carousel__heading" id="carousel-heading">Plan your visit</h2>
            <p class="carousel__description">Everything you need to know before you arrive</p>
        </div>
        <div class="carousel__controls js-carousel__controls" hidden>
            <button type="button" class="carousel__btn js-carousel__prev">
                <span class="visuallyhidden">Previous</span>
                <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor"><path d="M400-240 160-480l241-241 43 42-169 169h526v60H275l168 168-43 42Z" /></svg>
            </button>
            <button type="button" class="carousel__btn js-carousel__next">
                <span class="visuallyhidden">Next</span>
                <svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor"><path d="m560-242-43-42 168-168H160v-60h525L516-681l43-42 241 241-240 240Z" /></svg>
            </button>
        </div>
    </div>
    <div class="carousel__viewport js-carousel__viewport">
        <ul class="carousel__track" role="list">
            {ITEMS.map(item => <li key={item.title} class="carousel__slide"><Card {...item} /></li>)}
        </ul>
    </div>
</section>;

export default Code;
