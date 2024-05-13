import { h } from "preact";
import DefaultLayout from "@layouts/default";
import Status from "@components/status";
import { status as cookieBannerStatus } from "./patterns/cookie-banner";
import { status as expandableNavigationStatus } from "./patterns/expandable-navigation";
import { status as fullScreenNavigationStatus } from "./patterns/full-screen-navigation";
import { status as modalSearchStatus } from "./patterns/modal-search";
import { status as expandableSearchStatus } from "./patterns/expandable-search";
import { status as expandableSectionStatus } from "./patterns/expandable-section";
import { status as exclusiveTogglesStatus } from "./patterns/exclusive-toggles";
import { status as modalConfirmationStatus } from "./patterns/modal-confirmation";
import { status as tabsStatus } from "./patterns/tabs";
import { status as formValidationStatus } from "./patterns/form-validation";
import { status as formHeadingStatus } from "./patterns/form-headings";
import { status as headingSubheadingStatus } from "./patterns/heading-subheading";
import { status as showMoreStatus } from "./patterns/show-more";

export const title = "Home";

// export const meta = [{
//     name: 'description',
//     content: ''
// }];

const PATTERNS = [
	{ title: "Cookie banner", url: "/patterns/cookie-banner", status: cookieBannerStatus },
	{ title: "Exclusive toggles", url: "/patterns/exclusive-toggles", status: exclusiveTogglesStatus },
	{ title: "Expandable navigation", url: "/patterns/expandable-navigation", status: expandableNavigationStatus },
	{ title: "Expandable search", url: "/patterns/expandable-search", status: expandableSearchStatus },
	{ title: "Expandable section", url: "/patterns/expandable-section", status: expandableSectionStatus },
	{ title: "Form page headings", url: "/patterns/form-headings", status: formHeadingStatus },
	{ title: "Form validation", url: "/patterns/form-validation", status: formValidationStatus },
	{ title: "Full screen navigation", url: "/patterns/full-screen-navigation", status: fullScreenNavigationStatus },
	{ title: "Heading with subheading", url: "/patterns/heading-subheading", status: headingSubheadingStatus },
	{ title: "Modal confirmation", url: "/patterns/modal-confirmation", status: modalConfirmationStatus },
	// { title: 'Modal gallery', url: '/patterns/modal-gallery' },
	{ title: "Modal search", url: "/patterns/modal-search", status: modalSearchStatus },
	{ title: "Show more", url: "/patterns/show-more", status: showMoreStatus },
	{ title: "Tabs", url: "/patterns/tabs", status: tabsStatus },
];

const HomePage = () => (
	<DefaultLayout>
		<div class="wrap">
			<div class="table__container push-bottom">
				<table class="table">
					<thead>
						<tr>
							<th class="th">Pattern</th>
							<th class="th th--status">Status</th>
						</tr>
					</thead>
					<tbody>
						{PATTERNS.map((pattern) => (
							<tr class="tr">
								<td class="td">
									<a class="td__link" href={pattern.url}>
										{pattern.title}
									</a>
								</td>
								<td class="td td--status">
									<Status type={pattern.status} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p class="push-bottom">
				These UI patterns have been tested against the{" "}
				<a href="https://stormid.sharepoint.com/sites/Test/SitePages/Browsers-and-devices.aspx">Storm standard browser list</a>.{" "}
			</p>
			<p>
				Patterns marked as 'release' have been accessibility tested against Windows Desktop NVDA in Chrome and Firefox, VoiceOver on iOS and Android Talkback in December 2022.
			</p>
		</div>
	</DefaultLayout>
);

export default HomePage;
