<template>
	<div
		@click="checkClick"
		ref="eventWrap"
		class="event-wrap flex flex-column"
	>
		<form @submit.prevent="submitForm" class="event-content">
			<Loading v-show="loading" />
			<h1 v-if="!editEvent">New Event</h1>
			<h1 v-else>Edit Event</h1>

			<!-- EVENT DATA -->
			<div class="bill-from flex flex-column">
				<h2>EVENT DETAILS</h2>
				<div class="input flex flex-column">
					<div class="input flex flex-column">
						<label for="eventName">Event Name</label>
						<input
							required
							placeholder="Band or Artist Name"
							type="text"
							id="eventName"
							v-model="eventName"
						/>
					</div>
					<label for="event_loc">Event Location: </label>
					<select
						name="event_loc custom-select"
						id="event_loc"
						v-model="event_loc"
					>
						<option value="2etg">
							2 Etg, The Note - café og musikkbar: Peter Grøns
							Gate 2B, 3210, Sandefjord
						</option>
						<option value="1etg">
							1 Etg, The Note - café og musikkbar: Peter Grøns
							Gate 2B, 3210, Sandefjord
						</option>
						<option value="Uetg">
							U Etg, The Note - café og musikkbar: Peter Grøns
							Gate 2B, 3210, Sandefjord
						</option>
					</select>
				</div>
				<div class="time-date flex">
					<div class="input flex flex-column">
						<label for="start">Starts at:</label>
						<input
							id="start"
							type="datetime-local"
							name="start"
							v-model="startsAt"
						/>
					</div>
					<div class="input flex flex-column">
						<label for="end">Ends at:</label>
						<input
							id="end"
							type="datetime-local"
							name="end"
							v-model="endsAt"
						/>
					</div>
					<div class="input flex flex-column">
						<label for="seating">Seating:</label>
						<div class="radio-toolbar flex">
							<input
								type="radio"
								id="yes"
								name="seating"
								value="True"
								v-model="seating"
							/>
							<label for="yes">Yes</label>
							<input
								type="radio"
								id="no"
								name="seating"
								value="False"
								v-model="seating"
							/>
							<label for="no">No</label>
						</div>
					</div>
				</div>
				<div class="input flex flex-column">
					<label for="eventDescription">Event Description</label>
					<textarea
						required
						type="textarea"
						rows="8"
						wrap="hard"
						id="eventDescription"
						placeholder="   Insert Press Release   "
						v-model="eventDescription"
					/>
				</div>
			</div>

			<!-- LOCATION DATA -->
			<div class="bill-to flex flex-column">
				<h2>BAND / ARTIST INFORMATION</h2>
				<div class="input flex flex-column">
					<label for="clientName">Contact Name</label>
					<input
						required
						type="text"
						id="clientName"
						v-model="clientName"
					/>
				</div>
				<div class="input flex flex-column">
					<label for="clientEmail">Contact Email</label>
					<input
						required
						type="text"
						id="clientEmail"
						v-model="clientEmail"
					/>
				</div>
				<div class="input flex flex-column">
					<label for="clientStreetAddress">Street Address</label>
					<input
						type="text"
						id="clientStreetAddress"
						v-model="clientStreetAddress"
					/>
				</div>
				<div class="time-date flex">
					<div class="input flex flex-column">
						<label for="clientCity">City</label>
						<input
							type="text"
							id="clientCity"
							v-model="clientCity"
						/>
					</div>
					<div class="input flex flex-column">
						<label for="clientPostCode">Post Code</label>
						<input
							type="text"
							id="clientPostCode"
							v-model="clientPostCode"
						/>
					</div>
					<div class="input flex flex-column">
						<label for="clientCountry">Country</label>
						<input
							type="text"
							id="clientCountry"
							v-model="clientCountry"
						/>
					</div>
				</div>
			</div>

			<!-- TICKET DETAILS -->
			<!-- Event Work Details -->
			<div class="event-work flex flex-column">
				<h2>TICKETS</h2>
				<div class="input flex flex-column">
					<label for="productDescription"
						>Ticket Sales Description</label
					>
					<input
						required
						type="text"
						id="productDescription"
						v-model="productDescription"
					/>
				</div>
				<div class="work-items">
					<table class="item-list">
						<tr class="table-heading flex">
							<th class="item-name">Item Name</th>
							<th class="qty">Qty</th>
							<th class="price">Price</th>
						</tr>
						<tr
							class="table-items flex"
							v-for="(item, index) in eventItemList"
							:key="index"
						>
							<td class="item-name">
								<input type="text" v-model="item.itemName" />
							</td>
							<td class="qty">
								<input type="text" v-model="item.qty" />
							</td>
							<td class="price">
								<input type="text" v-model="item.price" />
							</td>
							<img
								@click="deleteEventItem(item.id)"
								src="@/assets/icon-delete.svg"
								alt=""
								class="trash"
							/>
						</tr>
					</table>

					<div @click="addNewEventItem" class="flex button">
						<img src="@/assets/icon-plus.svg" alt="" />
						Add New Ticket
					</div>
				</div>
			</div>
			<br /><br />

			<!-- EVENT OPTIONS -->
			<h2>EVENT OPTIONS</h2>
			<div class="flex options">
				<div>
					<h2>Tickets</h2>
					<div class="box">
						<input
							type="checkbox"
							id="ticket_set_1"
							name="ticket_set_1"
							value="True"
							v-model="ticket_set_1"
						/>
						<label for="ticket_set_1">
							Attach tickets to order confirmation email</label
						><br />
						<input
							type="checkbox"
							id="ticket_set_2"
							name="ticket_set_2"
							value="True"
							v-model="ticket_set_2"
						/>
						<label for="ticket_set_2">
							Display tickets on order confirmation page</label
						><br />
						<input
							type="checkbox"
							id="ticket_set_3"
							name="ticket_set_3"
							value="True"
							v-model="ticket_set_3"
						/>
						<label for="ticket_set_3">
							Send tickets to ADMIN on sale</label
						><br />
						<input
							type="checkbox"
							id="ticket_set_4"
							name="ticket_set_4"
							value="True"
							v-model="ticket_set_4"
						/>
						<label for="ticket_set_4">
							Display nuber of tickets available</label
						><br />
					</div>
				</div>
				<div>
					<h2>Pricing</h2>
					<div class="box">
						<input
							type="checkbox"
							id="pricing_set_1"
							name="pricing_set_1"
							value="True"
							v-model="pricing_set_1"
						/>
						<label for="pricing_set_1">
							Include platform fee in displayed prices</label
						><br />
					</div>
				</div>
				<div>
					<h2>Event</h2>
					<div class="box">
						<input
							type="checkbox"
							id="event_set_1"
							name="event_set_1"
							value="True"
							v-model="event_set_1"
						/>
						<label for="event_set_1">
							Enable custom registration forms</label
						><br />
						<input
							type="checkbox"
							id="event_set_2"
							name="event_set_2"
							value="True"
							v-model="event_set_2"
						/>
						<label for="event_set_2">
							Enable additional customer forms</label
						><br />
						<input
							type="checkbox"
							id="event_set_3"
							name="event_set_3"
							value="True"
							v-model="event_set_3"
						/>
						<label for="event_set_3"> Enable attendee badges</label>
					</div>
				</div>
			</div>

			<!-- MERCH DETAILS -->
			<div class="event-work flex flex-column">
				<h2>MERCHANDISE</h2>
				<div class="merch-items">
					<table class="item-list">
						<tr class="table-heading flex">
							<th class="item-name">Merch Name</th>
							<th class="qty">Qty</th>
							<th class="price">Price</th>
						</tr>
						<tr
							class="table-items flex"
							v-for="(item, index) in merchItemList"
							:key="index"
						>
							<td class="item-name">
								<input type="text" v-model="item.itemName" />
							</td>
							<td class="qty">
								<input type="text" v-model="item.qty" />
							</td>
							<td class="price">
								<input type="text" v-model="item.price" />
							</td>
							<img
								@click="deleteMerchItem(item.id)"
								src="@/assets/icon-delete.svg"
								alt=""
								class="trash"
							/>
						</tr>
					</table>

					<div @click="addNewMerchItem" class="flex button">
						<img src="@/assets/icon-plus.svg" alt="" />
						Add New Merch Item
					</div>
				</div>
			</div>

			<!-- SAVE / EXIT -->
			<div class="save flex">
				<div class="left">
					<button type="button" @click="closeEvent" class="red">
						Cancel
					</button>
				</div>
				<div class="right flex">
					<button
						v-if="!editEvent"
						type="submit"
						@click="saveDraft"
						class="orange"
					>
						Save Draft
					</button>
					<button
						v-if="!editEvent"
						type="submit"
						@click="publishEvent"
						class="purple"
					>
						Create Event
					</button>
					<button v-if="editEvent" type="sumbit" class="orange">
						Save Draft
					</button>
					<button v-if="editEvent" type="sumbit" class="purple">
						Update Event
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import db from "../firebase/firebaseinit";
import Loading from "../components/Loading";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";
export default {
	name: "eventModal",
	data() {
		return {
			dateOptions: { year: "numeric", month: "short", day: "numeric" },
			dateOptionsExtend: {
				weekday: "long",
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				hour12: false,
			},
			docId: null,
			loading: null,
			eventName: null,
			event_loc: null,
			startsAt: null,
			endsAt: null,
			seating: null,
			eventDescription: null,
			clientName: null,
			clientEmail: null,
			clientStreetAddress: null,
			clientCity: null,
			clientPostCode: null,
			clientCountry: null,
			eventDateUnix: null,
			eventDate: null,
			eventDateUnixExtend: null,
			eventDateExtend: null,
			productDescription: null,
			eventPending: null,
			eventDraft: null,
			eventItemList: [],
			merchItemList: [],
			eventCategoryList: [],
			eventTotal: null,
			merchTotal: null,
			ticket_set_1: false,
			ticket_set_2: false,
			ticket_set_3: false,
			pricing_set_1: false,
			event_set_1: false,
			event_set_2: false,
			event_set_3: false,
		};
	},
	components: {
		Loading,
	},
	created() {
		// get current date for event date field

		if (this.editEvent) {
			const currentEvent = this.currentEventArray[0];
			this.docId = currentEvent.docId;
			this.eventName = currentEvent.eventName;
			this.event_loc = currentEvent.event_loc;
			this.startsAt = currentEvent.startsAt;
			this.endsAt = currentEvent.endsAt;
			this.seating = currentEvent.seating;
			this.eventDescription = currentEvent.eventDescription;
			this.clientName = currentEvent.clientName;
			this.clientEmail = currentEvent.clientEmail;
			this.clientStreetAddress = currentEvent.clientStreetAddress;
			this.clientCity = currentEvent.clientCity;
			this.clientPostCode = currentEvent.clientPostCode;
			this.clientCountry = currentEvent.clientCountry;
			this.eventDateUnix = currentEvent.eventDateUnix;
			this.eventDate = currentEvent.eventDate;
			this.eventDateUnixExtend = currentEvent.eventDateUnixExtend;
			this.eventDateExtend = currentEvent.eventDateExtend;
			this.productDescription = currentEvent.productDescription;
			this.eventPending = currentEvent.eventPending;
			this.eventDraft = currentEvent.eventDraft;
			this.eventItemList = currentEvent.eventItemList;
			this.merchItemList = currentEvent.merchItemList;
			this.eventCategoryList = currentEvent.eventCategoryList;
			this.ticket_set_1 = currentEvent.ticket_set_1;
			this.ticket_set_2 = currentEvent.ticket_set_2;
			this.ticket_set_3 = currentEvent.ticket_set_3;
			this.pricing_set_1 = currentEvent.pricing_set_1;
			this.event_set_1 = currentEvent.event_set_1;
			this.event_set_2 = currentEvent.event_set_2;
			this.event_set_3 = currentEvent.event_set_3;
			this.eventTotal = currentEvent.eventTotal;
			this.merchTotal = currentEvent.merchTotal;
		}
	},
	methods: {
		...mapMutations(["TOGGLE_EVENT", "TOGGLE_MODAL", "TOGGLE_EDIT_EVENT"]),

		...mapActions(["UPDATE_EVENT", "GET_EVENTS"]),

		checkClick(e) {
			if (e.target === this.$refs.eventWrap) {
				this.TOGGLE_MODAL();
			}
		},

		closeEvent() {
			this.TOGGLE_EVENT();
			if (this.editEvent) {
				this.TOGGLE_EDIT_EVENT();
			}
		},

		addNewEventItem() {
			this.eventItemList.push({
				id: uid(),
				itemName: "",
				qty: "",
				price: 0,
			});
		},

		addNewMerchItem() {
			this.merchItemList.push({
				id: uid(),
				itemName: "",
				qty: "",
				price: 0,
			});
		},

		deleteEventItem(id) {
			this.eventItemList = this.eventItemList.filter(
				(item) => item.id !== id
			);
		},

		deleteMerchItem(id) {
			this.merchItemList = this.merchItemList.filter(
				(item) => item.id !== id
			);
		},

		// THIS IS CURRENTLY BROKEN... need to fix
		calEventTotal() {
			this.eventTotal = 0;
			this.eventItemList.forEach((item) => {
				this.eventTotal += parseFloat(item.qty)
			});
		},

		calMerchTotal() {
			this.merchTotal = 0;
			this.merchItemList.forEach((item) => {
				this.merchTotal += parseFloat(item.qty)
			});
		},

		publishEvent() {
			this.eventPending = true;
		},

		saveDraft() {
			this.eventDraft = true;
		},

		async uploadEvent() {
			if (this.eventItemList.length <= 0) {
				alert("Please ensure you filled out work items!");
				return;
			}

			this.loading = true;

			this.calEventTotal();
			this.calMerchTotal();

			const dataBase = db.collection("events").doc();

			await dataBase.set({
				eventId: uid(6),
				eventName: this.eventName,
				event_loc: this.event_loc,
				startsAt: this.startsAt,
				endsAt: this.endsAt,
				seating: this.seating,
				eventDescription: this.eventDescription,
				clientName: this.clientName,
				clientEmail: this.clientEmail,
				clientStreetAddress: this.clientStreetAddress,
				clientCity: this.clientCity,
				clientPostCode: this.clientPostCode,
				clientCountry: this.clientCountry,
				eventDate: this.eventDate,
				eventDateUnix: this.eventDateUnix,
				eventDateExtend: this.eventDateExtend,
				eventDateUnixExtend: this.eventDateUnixExtend,
				productDescription: this.productDescription,
				eventItemList: this.eventItemList,
				merchItemList: this.merchItemList,
				eventCategoryList: this.eventCategoryList,
				eventPending: this.eventPending,
				eventDraft: this.eventDraft,
				ticket_set_1: this.ticket_set_1,
				ticket_set_2: this.ticket_set_2,
				ticket_set_3: this.ticket_set_3,
				pricing_set_1: this.pricing_set_1,
				event_set_1: this.event_set_1,
				event_set_2: this.event_set_2,
				event_set_3: this.event_set_3,
				eventTotal: this.eventTotal,
				merchTotal: this.merchTotal,
				eventPublished: null,
			});

			this.loading = false;

			this.TOGGLE_EVENT();

			this.GET_EVENTS();
		},

		async updateEvent() {
			if (this.eventItemList.length <= 0) {
				alert("Please ensure you filled out work items!");
				return;
			}

			this.loading = true;

			this.calEventTotal();
			this.calMerchTotal();

			const dataBase = db.collection("events").doc(this.docId);

			await dataBase.update({
				eventName: this.eventName,
				event_loc: this.event_loc,
				startsAt: this.startsAt,
				endsAt: this.endsAt,
				seating: this.seating,
				eventDescription: this.eventDescription,
				clientName: this.clientName,
				clientEmail: this.clientEmail,
				clientStreetAddress: this.clientStreetAddress,
				clientCity: this.clientCity,
				clientPostCode: this.clientPostCode,
				eventDate: this.eventDate,
				eventDateUnixExtend: this.eventDateUnixExtend,
				eventDateExtend: this.eventDateExtend,
				clientCountry: this.clientCountry,
				productDescription: this.productDescription,
				eventItemList: this.eventItemList,
				merchItemList: this.merchItemList,
				eventCategoryList: this.eventCategoryList,
				ticket_set_1: this.ticket_set_1,
				ticket_set_2: this.ticket_set_2,
				ticket_set_3: this.ticket_set_3,
				pricing_set_1: this.pricing_set_1,
				event_set_1: this.event_set_1,
				event_set_2: this.event_set_2,
				event_set_3: this.event_set_3,
				eventTotal: this.eventTotal,
				merchTotal: this.merchTotal,
			});

			this.loading = false;

			const data = {
				docId: this.docId,
				routeId: this.$route.params.eventId,
			};

			this.UPDATE_EVENT(data);
		},

		submitForm() {
			if (this.editEvent) {
				this.updateEvent();
				return;
			}
			this.uploadEvent();
		},
	},
	computed: {
		...mapState(["editEvent", "currentEventArray"]),
	},
	watch: {
		startsAt() {
			this.eventDateUnix = this.startsAt;
			//removed toLocaleDateString ->> toLocaleString
			this.eventDate = new Date(this.eventDateUnix).toLocaleDateString(
				"en-uk",
				this.dateOptions
			);
			this.eventDateUnixExtend = this.startsAt;
			//removed toLocaleDateString ->> toLocaleString
			this.eventDateExtend = new Date(
				this.eventDateUnixExtend
			).toLocaleDateString("en-uk", this.dateOptionsExtend);
		},
	},
};
</script>

<style lang="scss" scoped>
.event-wrap {
	z-index: 101;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
	@media (min-width: 900px) {
		left: 90px;
	}

	.event-content {
		position: relative;
		padding: 56px;
		max-width: 700px;
		width: 100%;
		background-color: #5680e9;
		color: #fff;
		box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);

		h1 {
			margin-bottom: 58px;
			color: #fff;
		}

		h2 {
			margin-bottom: 38px;
			color: #fff;
		}

		h3 {
			margin-bottom: 16px;
			font-size: 18px;
			color: #777f98;
		}

		h4 {
			color: #fff;
			font-size: 12px;
			margin-bottom: 24px;
		}

		// Bill To / Bill From
		.bill-to,
		.bill-from {
			margin-bottom: 48px;

			.time-date {
				gap: 26px;
				div {
					flex: 1;
				}
			}
		}
		.radio-toolbar {
			margin: 5px;

			input[type="radio"] {
				opacity: 0;
				position: fixed;
				width: 0;
			}

			label {
				flex: 1;
				text-align: center;
				background-color: #ddd;
				margin: 5px;
				padding: 10px;
				font-family: sans-serif, Arial;
				font-size: 16px;
				border: 2px solid #444;
				border-radius: 20px;

				&:hover {
					background-color: #8860d0;
				}
			}

			input[type="radio"] {
				&:focus + label {
					border: 2px dashed #444;
				}

				&:checked + label {
					background-color: #5e3e99;
					border-color: #8860d0;
				}
			}
		}

		// Event Work

		.event-work {
			.payment {
				gap: 24px;
				div {
					flex: 1;
				}
			}

			.work-items,
			.merch-items {
				h2 {
					color: #fff;
				}

				.item-list {
					width: 100%;

					// Item Table Styling
					.table-heading,
					.table-items {
						gap: 16px;
						font-size: 12px;
						.item-name {
							flex-basis: 50%;
						}

						.qty {
							flex-basis: 20%;
						}

						.price {
							flex-basis: 20%;
							align-self: center;
						}

						img {
							flex-basis: 10%;
							-webkit-filter: invert(100%) sepia(0%) saturate(0%)
								hue-rotate(93deg) brightness(103%)
								contrast(103%);
							filter: invert(100%) sepia(0%) saturate(0%)
								hue-rotate(93deg) brightness(103%)
								contrast(103%);
						}
					}

					.table-heading {
						margin-bottom: 16px;

						th {
							text-align: left;
						}
					}

					.table-items {
						position: relative;
						margin-bottom: 24px;

						img {
							position: absolute;
							top: 15px;
							right: 0;
							width: 12px;
							height: 16px;
						}
					}
				}

				.button {
					color: black;
					background-color: #fff;
					align-items: center;
					justify-content: center;
					width: 100%;

					img {
						margin-right: 4px;
					}
				}
			}
		}

		.options {
			margin: 10px;
			.box {
				padding: 0px 10px;

				label {
					display: flex;
					align-items: center;
				}

				input[type="checkbox"] {
					flex: none;
				}
			}
		}

		.save {
			margin-top: 60px;

			div {
				flex: 1;
			}

			.right {
				justify-content: flex-end;
				margin-bottom: 60px;
			}
		}
	}

	.input {
		margin-bottom: 24px;
	}

	label {
		font-size: 12px;
		margin-bottom: 6px;
	}

	input,
	select {
		width: 100%;
		background-color: #fff;
		color: black;
		border-radius: 4px;
		padding: 12px 4px;
		border: none;

		&:focus {
			outline: none;
		}
	}
}
</style>
