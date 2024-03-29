<template>
	<div>
		<ul class="list-unstyled mt-2">
			<li class="d-inline">
				<button
				:class="type == 'fix' ? 'btn-secondary' : 'btn-outline-secondary'"
				class="btn btn-sm text-light w-32"
				@click="filterUpdates('fix')">
					<i class="fas fa-bug text-success"></i> Fix
				</button>
			</li>

			<li class="d-inline">
				<button
				:class="type == 'feature' ? 'btn-secondary' : 'btn-outline-secondary'"
				class="btn btn-sm text-light w-32"
				@click="filterUpdates('feature')">
					<i class="fas fa-plus text-primary"></i> Feature
				</button>
			</li>

			<li class="d-inline">
				<button
				:class="type == 'update' ? 'btn-secondary' : 'btn-outline-secondary'"
				class="btn btn-sm text-light w-32"
				@click="filterUpdates('update')">
					<i class="fas fa-exclamation-circle text-info"></i> Update
				</button>
			</li>
		</ul>

		<ul class="list-unstyled py-1">
			<li
			:key="i"
			v-for="(log,i) in logs"
			style="background-color: #282c38;border-left: 3px solid white;"
			class="my-3 px-sm-4 py-1 font-xs-12 rounded">
				<h6 class="ml-2">
					{{ log.date }}

					<i
					v-if="log.types.includes('fix')"
					class="fas fa-bug text-success"></i>

					<i
					v-if="log.types.includes('feature')"
					class="fas fa-plus text-primary"></i>

					<i v-if="log.types.includes('update')"
					class="fas fa-exclamation-circle text-info"></i>
				</h6>
				<ul>
					<li
					:key="j"
					v-for="(change,j) in log.changes">
						{{ change }}
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'changeLog',
		data(){
			return {
				type: '',
				logs: [],
				changes: [
					{
						date: '2021.03.14',
						types: [],
						changes: [
							'Genshin Impact Artifact Generator has been deployed!'
						]
					},
					{
						date: '2021.03.15',
						types: ['feature','fix','update'],
						changes: [
							'Added site info modal',
							'Changed app loading screen',
							'Fixed bugs'
						]
					},
					{
						date: '2021.03.16',
						types: ['update'],
						changes: [
							'Updated contact info',
							'Small changes in the guide',
							'Added plans'
						]
					},
					{
						date: '2021.03.17',
						types: ['feature','update'],
						changes: [
							'Added different views to inventory',
							'Updated guide',
							'Limited the size of filters in inventory'
						]
					},
					{
						date: '2021.03.19',
						types: ['update'],
						changes: [
							'Updated plans'
						]
					},
					{
						date: '2021.03.20',
						types: ['feature','fix'],
						changes: [
							'Added pagination support to inventory',
							'Added roll stats to artifact generator',
							"Fixed not working inventory view changing"
						]
					},
					{
						date: '2021.03.21',
						types: ['feature'],
						changes: [
							'Added game-like upgrade option to artifact generator'
						]
					},
					{
						date: '2021.03.22',
						types: ['update','feature'],
						changes: [
							'Updated guide',
							'Updated plans'
						]
					},
					{
						date: '2021.03.24',
						types: ['update','feature'],
						changes: [
							'Improved background logic',
							'Added exclude option to inventory filters',
							'Updated guide'
						]
					},
					{
						date: '2021.03.25',
						types: ['update','feature'],
						changes: [
							'Design improvements',
							'Added counters to filter dropdown',
							'Added option to delete artifacts in inventory'
						]
					},
					{
						date: '2021.03.26',
						types: ['feature','update'],
						changes: [
							'Added select all option to deleting artifacts in inventory',
							'Design improvements',
							'Single filters no longer filter automatically when selecting from dropdown',
							'Added "Select all" and "Apply" option to filter dropdowns',
							'Added search option to sets filter dropdown'
						]
					},
					{
						date: '2021.03.27',
						types: ['feature'],
						changes: [
							'Added "Notices" tab',
							'Added artifact search option'
						]
					},
					{
						date: '2021.03.28',
						types: ['feature'],
						changes: [
							'Changed delete artifacts option in inventory from dropdown option to a separate button'
						]
					},
					{
						date: '2021.03.30',
						types: ['feature','update'],
						changes: [
							'Moved "Exclude filters" option in inventory to filter dropdown',
							'Design changes'
						]
					},
					{
						date: '2021.03.31',
						types: ['update','feature'],
						changes: [
							'Changed star and type filter into dropdowns',
							'Added "Exclude" option to each filter options, now you can separately set each filter type to include/exclude the selected options',
							'Added 10x roll option to artifact generator'
						]
					},
					{
						date: '2021.04.01',
						types: ['fix'],
						changes: [
							'Fixed upgrade and sub reroll issues when rolling 10x'
						]
					},
					{
						date: '2021.04.02',
						types: ['update','feature','fix'],
						changes: [
							'Design changes',
							'Both single and 10x options are available when opening the app',
							'Updated plans',
							'After doing a 10x roll, the first artifact is already visible',
							'Design issue fixes'
						]
					},
					{
						date: '2021.04.03',
						types: ['fix','update'],
						changes: [
							'Design issue fixes',
							'Improved usability'
						]
					},
					{
						date: '2021.04.05',
						types: ['feature'],
						changes: [
							'Grouped sort options in inventory'
						]
					},
					{
						date: '2021.04.06',
						types: ['feature'],
						changes: [
							'Changed domain select in artifact generator from select into a collapsable menu with the image of sets displayed'
						]
					},
					{
						date: '2021.04.07',
						types: ['feature'],
						changes: [
							'Clicking/touching an artifact in "Tiles" view will show the main and sub stats. You can also edit your artifact from there',
							'Added option to display selected filters'
						]
					},
					{
						date: '2021.04.11',
						types: ['update','feature'],
						changes: [
							'Improved background logic',
							'Implemented achievement system! You can earn new achievements by rolling artifacts, upgrading and adding them to your inventory. Option to view them will also be added in the near future!',
							'Added labels to updates based on their type, and you can filter them',
							'Improved updates design',
							'Changed artifact window design',
							'Added upgrade level select option to artifact window in inventory'
						]
					},
					{
						date: '2021.04.13',
						types: ['feature','update'],
						changes: [
							'Added option to view your achievement progress',
							'Added more achievements. Earn new achievements by upgrading artifacts to their max level and adding different kind of artifacts to your inventory',
							'Added different kind of animations to inventory',
							'Updated plans'
						]
					},
					{
						date: '2021.04.14',
						types: ['update'],
						changes: [
							'Design improvements',
							"On touch devices, inventory and achievements won't load automatically when the app loads to improve performance"
						]
					},
					{
						date: '2021.04.15',
						types: ['fix'],
						changes: [
							"Fixed app crashing after trying to add artifact to inventory if it's empty. My apologies to everyone who couldn't use the app because of it."
						]
					},
					{
						date: '2021.04.18',
						types: ['update','fix'],
						changes: [
							'Improved background logic',
							'Improved performance',
							'Fixed wrong achievement notification when earning new "Overall" achievement while rolling in domain'
						]
					},
					{
						date: '2021.04.22',
						types: ['feature'],
						changes: [
							'Added option to lock artifacts when rolling and in inventory. Locked artifacts cannot be rerolled or deleted from your inventory.'
						]
					},
					{
						date: '2021.04.23',
						types: ['feature','fix'],
						changes: [
							'Added option to filter inventory to locked/unlocked artifacts',
							'Fixed inventory saving wrong artifacts after filtering (un)locked artifacts and (un)locking them'
						]
					},
					{
						date: '2021.04.25',
						types: ['fix','feature','update'],
						changes: [
							'Design issue fixes',
							'Added icons and images to the following filter select options: main stat, sub stat, sets',
							'Added locked status icon to "Tiles" and "Compressed cards" view',
							'Organized stats on main and sub stat filters'
						]
					},
					{
						date: '2021.04.29',
						types: ['update'],
						changes: [
							'New domain "Ridge Watch" has been added',
							'New artifact sets "Pale Flame" and "Tenacity of the Millelith" have been added'
						]
					},
					{
						date: '2021.04.30',
						types: ['fix','feature'],
						changes: [
							'Fixed locked icon\'s wrong appearance in artifact modal if it\' locked and the view is in "Compressed cards"',
							'Added display animation to inventory filters'
						]
					},
					{
						date: '2021.05.02',
						types: ['feature','update'],
						changes: [
							'Added icons and images to the following filter select options: stars, types',
							'When deleting artifacts, locked artifats will be displayed in "Tiles" view as well, but they will be disabled with the lock icon also showing that they are locked',
							'In "Full cards" and "Compressed cards" views the locked status of artifacts can\'t be changed, the buttons will be disabled'
						]
					},
					{
						date: '2021.05.03',
						types: ['update'],
						changes: [
							'Artifacts will not reload when entering deleting mode in inventory in "Tiles" view'
						]
					},
					{
						date: '2021.05.07',
						types: ['feature','update'],
						changes: [
							'Added option to equip artifacts on characters. To equip an artifact, open the artifact window and choose a character from the "Equip" select',
							'Added character filter in inventory. You can filter your artifacts based on who\'s wearing them',
							'To open the artifact window in "Full cards" and "Compressed cards" view, now you have click/touch their thumbnail image',
							'Added image of character who\'s currently weaing it to artifacts in inventory',
							'Updated plans'
						]
					},
					{
						date: '2021.05.08',
						types: ['feature','update'],
						changes: [
							'Added equip option to single and 10x artifact rolls',
							'Design changes',
							'Added search option to character filter in inventory'
						]
					},
					{
						date: '2021.05.22',
						types: ['feature'],
						changes: [
							'Added helpful tooltips to some elements',
							'By clicking the image of the character wearing the artifact in "Compressed cards" and "Full cards" view, you can quickly filter your inventory to show artifacts which that character is wearing'
						]
					},
					{
						date: '2021.06.09',
						types: ['fix'],
						changes: [
							'Fixed the bug when doing 10x rolls and adding the last artifact to inventory, it doesn\'t get removed and the inventory data gets corrupted'
						]
					},
					{
						date: '2021.06.10',
						types: ['feature'],
						changes: [
							'With a button at the bottom of your inventory, you can quickly reset it to its original state'
						]
					},
					{
						date: '2021.06.16',
						types: ['fix'],
						changes: [
							'Changed wrong appearance of "Reset inventory" button. From now it will only appear once at least one filter has been applied'
						]
					},
					{
						date: '2021.06.21',
						types: ['update'],
						changes: [
							'On mobile devices when rolling artifact or managing artifacts, set effects are hidden by default, improving usability for users with smaller devices. Effects can be toggled by clicking the the set name'
						]
					},
					{
						date: '2021.06.22',
						types: ['update','feature'],
						changes: [
							'Changed "Roll settings" to "General site settings"',
							'Added option to display/hide set effects everywhere on all devices by default'
						]
					},
					{
						date: '2021.06.25',
						types: ['update'],
						changes: [
							'Added new characters: Ayaka, Kazuha, Sayu and Yoimiya'
						]
					},
					{
						date: '2021.06.27',
						types: ['feature'],
						changes: [
							'Grouped characters by their element/vision in equip dropdowns'
						]
					},
					{
						date: '2021.06.29',
						types: ['feature'],
						changes: [
							'Added "Gold roll" option. Using this feature, you have 1 opportunity each day to generate a custom artifact to your needs/desires. You can select a 5* set, a piece type, and main and sub stats manually. After doing so, you will be redirected to the roll page where you can manage it as any other randomly generated artifacts'
						]
					},
					{
						date: '2021.07.02',
						types: ['feature'],
						changes: [
							'Added option to filter characters by their element/vision in equip dropdowns'
						]
					},
					{
						date: '2021.07.24',
						types: ['update'],
						changes: [
							'New domain "Momiji-Dyed Court" has been added',
							'New artifact sets "Shimenawa\'s Reminiscence" and "Emblem of Severed Fate" have been added'
						]
					},
					{
						date: '2021.08.26',
						types: ['update','fix'],
						changes: [
							'Added new characters: Aloy, Sara, Raiden and Kokomi',
							'Fixed not working gold roll after doing a 10x roll'
						]
					},
					{
						date: '2021.08.27',
						types: ['fix'],
						changes: [
							'Design issue fixes'
						]
					},
				]
			}
		},
		methods: {
			filterUpdates(type){
				if(this.type == type){
					this.type='';
					this.logs=this.changes
					return
				}

				this.logs=this.changes;
				this.logs=this.logs.filter(log => log.types.includes(type));
				this.type=type;
			}
		},
		created(){
			this.changes.reverse();
			this.logs=this.changes;
		}
	}
</script>