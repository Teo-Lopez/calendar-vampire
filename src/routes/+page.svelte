<script>
	import { DateTime, Interval } from 'luxon';
	import { onMount } from 'svelte';
	let startingDate = DateTime.fromObject({ day: 8, month: 10 }).minus({ days: 5 });
	const dates = new Array(31).fill(0).map((_, i) => ({
		day: startingDate.plus({ days: i }).toFormat('d'),
		weekDay: startingDate.plus({ days: i }).toFormat('EEE')
	}));

	// MODIFY THIS TO CHANGE THE DATE
	const today = DateTime.fromObject({ day: 12, month: 10 });

	const finalDate = DateTime.fromObject({ day: 31, month: 10 });
	const intervalToLastDay = Interval.fromDateTimes(today, finalDate);
	const daysLeft = intervalToLastDay.count('days');
	const previousDaysLeft = daysLeft + 1;
	const currentMonth = today.monthLong;
	/**
	 * @type {HTMLElement}
	 */
	let datesWrapper;
	let isFading = false;
	onMount(() => {
		isFading = true;

		setTimeout(() => {
			datesWrapper.style.transform = `translateX(-${datesWrapper.scrollWidth / 6.5}px)`;
		}, 1000);
	});
</script>

<section class="calendar noSelect">
	<header>
		<h2>{currentMonth}</h2>
		<p>
			Quedan:
			<span class="daysCounter">
				<span class:fadeOut={isFading} class="previousDaysLeft">{previousDaysLeft}</span>
				<span class:fadeIn={isFading} class="currentDaysLeft">{daysLeft}</span>
			</span>
			días
		</p>
	</header>

	<section bind:this={datesWrapper} class="datesWrapper noSelect">
		{#each dates as date}
			<div class:isToday={date.day === today.toFormat('d')} class="date">
				<p class="day noSelect">{date.day}</p>
				<p class="weekDay">{date.weekDay}</p>
			</div>
		{/each}
	</section>
</section>

<style>
	* {
		--midnight-black: #111;
		--vampire-purple: #5d2d6d;
		--ghostly-gray: #b4b8c1;
		--ghostly-black: #595a5a;
		--crimson-red: #9b111e;
		--dark-crimson: #7a0c18;
		--blood-burgundy: #5c0b12;
	}

	.calendar {
		overflow-y: hidden;
	}

	header {
		display: flex;
		justify-content: space-between;
		padding: 0 8px;

		h2,
		p {
			color: var(--vampire-purple);
			font-size: 4rem;
			letter-spacing: 3px;
			z-index: 10;
		}

		h2 {
			text-transform: capitalize;
		}

		.daysCounter {
			position: relative;
			padding: 0 5px;
			box-shadow: 0 0 5px 5px #111;
			border-radius: 5px;
		}

		.fadeIn {
			opacity: 1 !important;
		}

		.fadeOut {
			opacity: 0 !important;
		}

		.previousDaysLeft {
			position: absolute;
			transition: all 1s;
			transition-delay: 1s;
			/* transform: translateY(10px); */
		}

		.currentDaysLeft {
			opacity: 0;
			transition: all 1s;
			transition-delay: 2s;
			/* transform: translateY(10px); */
		}
	}

	.noSelect {
		cursor: none;
		-webkit-user-select: none;
		user-select: none;
		border: none;
		text-decoration: none;
	}

	.datesWrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		user-select: none;
		height: 90vh;
		transform: translateX(-10%);
		transition-duration: 2s;
		transition-property: transform;
		transition-timing-function: ease-in-out;

		.date {
			display: flex;
			height: 100%;
			padding: 0 12px;
			margin: 0 24px;
			color: var(--ghostly-gray);
		}

		.day {
			font-size: 4rem;
			font-weight: 800;
			display: flex;
			align-items: center;
		}

		.weekDay {
			display: block;
			margin-left: 12px;
			font-size: 1.2rem;
			display: flex;
			align-items: center;
		}

		.date.isToday {
			height: 200%;
			/* color: whitesmoke; */
			background: linear-gradient(var(--blood-burgundy), var(--dark-crimson), var(--crimson-red));
			box-shadow: 0 0 50px 30px #9b111e80;
			/* background-color: #0048a0;  galician blue*/
		}

		.date {
			transform: rotateZ(-30deg);

			p {
				transform: rotateZ(30deg);
			}
		}
	}
</style>
