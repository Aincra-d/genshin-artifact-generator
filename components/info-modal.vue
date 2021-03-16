<template>
    <div>
        <ui-modal
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        :alignTopMargin="0"
        :max-height="100"
        title="About"
        ref="infoModal"
        class="text-dark text-center info-modal">
            <div class="w-100 text-left text-dark">
                <p class="font-15">
                    Genshin Impact Artifact Generator is a hobby project of mine, which is the result of me loving Genshin Impact, and having programming knowledge with too much free time on my hands.

                    <br><br>

                    <u><h2>Guide</h2></u>

                    <h5>Artifact roll</h5>

                    <ul>
                        <li>
                            By (un)checking the <i>"Include 1-3 <i class="fas fa-star"></i> artifacts"</i> you can choose to whether to unclude 1-3 star artifacts when rolling or not.
                        </li>

                        <li>
                            You can generate any artifacts from any of the available domains in the game, by choosing one from the <i>"Select domain"</i> option.
                        </li>

                        <li>
                            By choosing one, the algorithm will generate artifacts only available in the selected domain
                        </li>

                        <li>
                            By not choosing any option, you will randomly get artifacts from all available sets.
                        </li>

                        <li>
                            Choose the "No domain" option to get artifacts that are not available from any domains, like Gladiator's Finale, Wanderer's Troupe or Instructor.
                        </li>

                        <li>
                            Once rolled, you can upgrade your artifact. This works <b>exactly</b> like in the game. Each upgrade will add 4 levels to your artifacts, which is when a substat gets upgraded in Genshin. All these upgrades are <b>completely random</b>. No substat has higher or lower chance of getting upgrades.
                        </li>

                        <li>
                            You have the option to reroll the main and sub stats of each artifact <b>once</b>.
                            Rerolling the main stat will not, but rerolling sub stats will reset the state of the artifacts completely(main stat will remain the same), so you can upgrade once again.
                        </li>

                        <li>
                            You can add an artifact to your inventory at any state. All the options above can be done to artifacts that are already in your inventory too.
                        </li>
                    </ul>

                    <h5>Inventory</h5>

                    <ul>
                        <li>
                            Here you will see each artifacts you have added to your inventory. Here you have the option to change them, sort or filter them.
                        </li>

                        <li>
                            You can choose to sort (<i class="fas fa-sort"></i>) your artifacts by any of the available sub stats in either ascending or descending order.
                        </li>

                        <li>
                            You can also filter (<i class="fas fa-filter"></i>) your artifacts. You can filter them by:

                            <ul>
                                <li>Stars</li>
                                <li>Main stats</li>
                                <li>Sub stats</li>
                                <li>Types</li>
                                <li>Sets</li>
                            </ul>

                            You can choose to apply just one filter at the time, in which case your artifacts will be sorted each time you change your filter automatically, or by checking the "Stack filters" option, you can apply multiple filters. In this case, the filters will only be applied once you manually do so, by clicking the "Apply filters" button. Also, all your selected filter options will be displayed, so you will know what filters you will apply. You can also quickly change them by clicking the <i class="fas fa-edit text-primary"></i> button, or remove those filters with the <i class="fas fa-times text-danger"></i> button.
                        </li>

                        <li>
                            By clicking the "Reset" button, you can reset your inventory to its original state, removing all applied filters. This will <b>NOT</b> delete your inventory.
                        </li>

                        <li>
                            By clicking the button at the top-right corner of each artifact, you can edit your artifacts, just like when you roll them, or choose to remove them from your inventory. <br>
                            <b>Note:</b> if you have already rerolled either the main or sub stats before adding to your inventory, those options will be kept, thus disabling those buttons.
                        </li>
                    </ul>

                    <h4>
                        Welcome to RNG hell, and have fun!
                    </h4>

                    <b>© 2021 Copyright: <i class="fab fa-discord"></i> Mommy Beidou❤️</b>
                    <br>
                    Beidou best girl btw
                </p>
            </div>
        </ui-modal>
    </div>
</template>

<script>
    export default{
        name: 'infoModal',
        methods: {
            openModal() {
                this.$refs['infoModal'].open();
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            }
        }
    }
</script>