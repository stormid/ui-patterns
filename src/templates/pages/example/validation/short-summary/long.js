import { h } from 'preact';
import ExampleLayout from '@layouts/example';

export const title = 'Form validation example';

const Validation = () => <ExampleLayout>
    <main>
        <form class="form js-short-summary" action="#">
            <div class="visually-hidden" data-error-summary role="alert" />
            <fieldset class="fieldset">
                <legend class="legend">Your details</legend>
                <div class="push-bottom">
                    <label for="f_3fcb38c71c74e61180ca00505684117c" class="label">
                        First Name
                        <span class="error-message" data-valmsg-for="f_3fcb38c71c74e61180ca00505684117c" />
                    </label>
                    <input data-val="true" data-val-required="First name is required" class="input" type="text" id="f_3fcb38c71c74e61180ca00505684117c" name="f_3fcb38c71c74e61180ca00505684117c" value="" />
                </div>

                <div class="push-bottom">
                    <label for="f_040be6e11c74e61180ca00505684117c" class="label">
                        Last Name
                        <span class="error-message" data-valmsg-for="f_040be6e11c74e61180ca00505684117c" />
                    </label>
                    <input data-val="true" data-val-required="Last name is required" class="input" type="text" id="f_040be6e11c74e61180ca00505684117c" name="f_040be6e11c74e61180ca00505684117c" value="" />
                </div>

                <div class="push-bottom">
                    <label for="f_e1a2f0121d74e61180ca00505684117c" class="label">
                        Email
                        <span class="error-message" data-valmsg-for="f_e1a2f0121d74e61180ca00505684117c" />
                    </label>
                    <input data-val="true" data-val-required="Email is required" data-val-email="Email must be correct format" class="input" type="email" id="f_e1a2f0121d74e61180ca00505684117c" name="f_e1a2f0121d74e61180ca00505684117c" value="" />
                </div>

                <div class="push-bottom">
                    <label for="f_780c312f1d74e61180ca00505684117c" class="label">
                        Company Name
                        <span class="error-message" data-valmsg-for="f_780c312f1d74e61180ca00505684117c" />
                    </label>
                    <input data-val="true" data-val-required="Company name is required" class="input" type="text" id="f_780c312f1d74e61180ca00505684117c" name="f_780c312f1d74e61180ca00505684117c" value="" />
                </div>

                <div class="push-bottom">
                    <label for="f_e5ce0352b486e81180f700505684117c" class="label">
                        Business Sector
                        <span class="field-validation-error error-message" data-valmsg-for="f_e5ce0352b486e81180f700505684117c" />
                    </label>
                    <select data-val="true" data-val-required="Business sector is required" class="select" id="f_e5ce0352b486e81180f700505684117c" name="f_e5ce0352b486e81180f700505684117c">
                        <option value="" />
                        <option value="Aquaculture">Aquaculture</option>
                        <option value="Catching">Catching</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Distributors">Distributors</option>
                        <option value="EU">EU</option>
                        <option value="Education">Education</option>
                        <option value="Exporter">Exporter</option>
                        <option value="External Experts">External Experts</option>
                        <option value="Fish market">Fish market</option>
                        <option value="Fishing Port">Fishing Port</option>
                        <option value="Food Service">Food Service</option>
                        <option value="Govt Bodies">Govt Bodies</option>
                        <option value="Harbour">Harbour</option>
                        <option value="Importer">Importer</option>
                        <option value="Internal (Seafish)">Internal (Seafish)</option>
                        <option value="Marine Aggregates">Marine Aggregates</option>
                        <option value="Marine Protection">Marine Protection</option>
                        <option value="Media">Media</option>
                        <option value="NGO/Charities">NGO/Charities</option>
                        <option value="Oil and Gas">Oil and Gas</option>
                        <option value="Other">Other</option>
                        <option value="Processing">Processing</option>
                        <option value="Renewable Energy">Renewable Energy</option>
                        <option value="Retail">Retail</option>
                        <option value="Subsea Cables">Subsea Cables</option>
                        <option value="UK Gov Administration">UK Gov Administration</option>
                        <option value="UK Product buyer">UK Product buyer</option>
                        <option value="Wholesalers">Wholesalers</option>
                    </select>
                </div>
            </fieldset>


            <fieldset class="fieldset push-bottom">
                <legend class="legend">Newsletters</legend>
                <div class="push-bottom">Please tick as many boxes below to sign up to receive email updates from Seafish. By signing up you agree to receive regular updates.</div>

                <fieldset class="fieldset fieldset--secondary">
                    <legend class="legend legend--secondary">Seafish News</legend>
                    <p class="push-bottom--half">This is our general update about Seafish work and business critical content.</p>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_df03019b50e7e81180fa00505684117c" name="f_df03019b50e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_df03019b50e7e81180fa00505684117c">The Catch</label>
                    </div>
                </fieldset>

                <fieldset class="fieldset fieldset--secondary">
                    <legend class="legend legend--secondary">Regulation</legend>
                    <p class="push-bottom--half">Regular updates on the EU-UK Trade and Cooperation agreement and other regulatory information.</p>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_b58a88ca75e7e81180fa00505684117c" name="f_b58a88ca75e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_b58a88ca75e7e81180fa00505684117c">Regulation</label>
                    </div>
                </fieldset>

                <fieldset class="fieldset fieldset--secondary">
                    <legend class="legend legend--secondary">Environmental Sustainability </legend>
                    <p class="push-bottom--half">Updates for businesses on how to work more sustainably.</p>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_263c4f98b3ebeb11812b00505684117c" name="f_263c4f98b3ebeb11812b00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_263c4f98b3ebeb11812b00505684117c">Seafood and Climate Change</label>
                    </div>
                </fieldset>

                <fieldset class="fieldset fieldset--secondary">
                    <legend class="legend legend--secondary">Promoting Seafood</legend>
                    <p class="push-bottom">Updates from Love Seafood campaigns including assets and resources your business can share with customers.</p>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_28c146591fdbea11811900505684117c" name="f_28c146591fdbea11811900505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_28c146591fdbea11811900505684117c">Love Seafood</label>
                    </div>
                </fieldset>

                <fieldset class="fieldset fieldset--secondary">
                    <legend class="legend legend--secondary">Regional updates</legend>
                    <p class="push-bottom--half">Updates from our regional managers around the UK.</p>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_c521284e9d96ea11810a00505684117c" name="f_c521284e9d96ea11810a00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_c521284e9d96ea11810a00505684117c">England Update</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_63452ac226abea11811100505684117c" name="f_63452ac226abea11811100505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_63452ac226abea11811100505684117c">Northern Ireland Update</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_2571d4be0cb6ea11811200505684117c" name="f_2571d4be0cb6ea11811200505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_2571d4be0cb6ea11811200505684117c">Scotland Update</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_68559a052a31e91180fc00505684117c" name="f_68559a052a31e91180fc00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_68559a052a31e91180fc00505684117c">Wales Update</label>
                    </div>
                </fieldset>

                <fieldset class="fieldset fieldset--secondary">
                    <legend class="legend legend--secondary">Safety and training</legend>
                    <p class="push-bottom--half">Updates about fishing safety and training courses.</p>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_223b92a975e7e81180fa00505684117c" name="f_223b92a975e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_223b92a975e7e81180fa00505684117c">Kingfisher Bulletin</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_9b6e617775e7e81180fa00505684117c" name="f_9b6e617775e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_9b6e617775e7e81180fa00505684117c">Seafood Training</label>
                    </div>
                </fieldset>

                <fieldset class="fieldset fieldset--secondary">
                    <legend class="legend legend--secondary">Seafood Issues Groups</legend>
                    <p class="push-bottom--half">Event information for our Seafood Issues Groups and news on each topic.</p>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_e90728a974e7e81180fa00505684117c" name="f_e90728a974e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_e90728a974e7e81180fa00505684117c">Aquaculture Common Issues</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_301880c474e7e81180fa00505684117c" name="f_301880c474e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_301880c474e7e81180fa00505684117c">Common Language</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_b972253475e7e81180fa00505684117c" name="f_b972253475e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_b972253475e7e81180fa00505684117c">Fisheries Management and  Innovation</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_412ddb5975e7e81180fa00505684117c" name="f_412ddb5975e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_412ddb5975e7e81180fa00505684117c">Fishmeal and Fish Oil</label>
                    </div>
                    <div class="checkbox">
                        <input class="checkbox__input" id="f_e0de541675e7e81180fa00505684117c" name="f_e0de541675e7e81180fa00505684117c" type="checkbox" />
                        <label class="checkbox__label" for="f_e0de541675e7e81180fa00505684117c">Seafood Ethics Common Language</label>
                    </div>
                </fieldset>


            </fieldset>


            <fieldset class="fieldset push-bottom--double">
                <legend class="legend">Terms and conditions</legend>
                <div class="checkbox">
                    <input data-val="true" data-val-required="You must agree to the terms and conditions" class="checkbox__input" id="f_2e32eb840e98e91180fe00505684117c" name="f_2e32eb840e98e91180fe00505684117c" type="checkbox" />
                    <label class="checkbox__label" for="f_2e32eb840e98e91180fe00505684117c">
                        I have read and agree to the privacy policy
                        <span class="field-validation-error pull-up" data-valmsg-for="f_2e32eb840e98e91180fe00505684117c" />
                    </label>
                </div>
            </fieldset>
            <button class="btn">Submit</button>
        </form>
    </main>
</ExampleLayout>;

export default Validation;