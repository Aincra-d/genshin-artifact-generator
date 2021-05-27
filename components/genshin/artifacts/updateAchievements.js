export const updateAchievements={
    updateUpgrades(self){
        let new_sub_achievements=[];
        let new_max_upgrade=0;

        self.upgrades.forEach(upgrade => {
            let new_achievement={};
            self.achievements.upgrades.subs[upgrade.name].forEach(sub => {
                if(upgrade.new_value >= sub.value && !sub.done) {
                    sub.done=true;
                    let name=upgrade.name;
                    let free =self.achievements.upgrades.subs[upgrade.name].filter(sub => !sub.done).length > 0 ? true : false;

                    if(free){
                        new_achievement={
                            name,
                            value: self.achievements.upgrades.subs[upgrade.name].filter(sub => sub.done)[self.achievements.upgrades.subs[upgrade.name].filter(sub => sub.done).length - 1].value
                        };

                        if(new_sub_achievements.map(achievement => achievement.name).includes(new_achievement.name)){
                            new_sub_achievements[new_sub_achievements.findIndex(achievement => achievement.name == new_achievement.name)].value=new_achievement.value;
                        }
                        else{
                            new_sub_achievements.push(new_achievement)
                        }
                    }
                }
            });
        });

        self.achievements.upgrades.max_level_numbers.forEach(counter => {
            if(self.max_upgrades >= counter.value && !counter.done){
                counter.done=true;
                new_max_upgrade=counter.value;
            }
        });

        if(new_max_upgrade != 0){
            self.$notify({
                group: 'foo',
                type: 'info',
                duration: 1500,
                title: `<h6>New achievement unlocked!</h6> Upgrade ${new_max_upgrade} artifacts to max level</b>`
            });
        }

        if(new_sub_achievements.length > 0){
            new_sub_achievements.forEach((achievement,i) => {
                self.$notify({
                    group: 'foo',
                    type: 'info',
                    duration: (i+1)*1500,
                    title: `<h6>New achievement unlocked!</h6> Upgrade a <b>${achievement.name}</b> sub stat over <b>${achievement.value}`+(achievement.name.includes('%') ? '%' : '')+'</b>'
                });
            });
        }

        self.$store.commit('artifacts/setAchievements',self.achievements);
    },
    updateRolls(self){
        let overall_rolls=0;
        let domain_rolls=0;

        self.achievements.rolls.overall.forEach(counter => {
            if(self.roll_counter > counter.value && !counter.done){
                counter.done=true;
                overall_rolls=counter.value;
            }
        });

        if(self.selected_domain != ''){
            let domain_counter=self.roll_stats.filter(stat => stat.name == self.selected_domain)[0].counter;

            self.achievements.rolls.domains.filter(domain => domain.name == self.selected_domain)[0].values.forEach(counter => {
                if(domain_counter > counter.value && !counter.done){
                    counter.done=true;
                    domain_rolls=counter.value;
                }
            });
        }

        if(overall_rolls != 0 || domain_rolls!=0){
            self.$notify({
                group: 'foo',
                type: 'info',
                duration: 1500,
                title: `<h6>New achievement unlocked!</h6> Do over ${overall_rolls || domain_rolls} rolls`+
                ((self.selected_domain != '' && overall_rolls === 0) ? ` in ${self.selected_domain}.` : '')+'.'
            });

            self.$store.commit('artifacts/setAchievements',self.achievements);
        }
    },
    updateInventory(self){
        if(!localStorage.artifacts) return
        else{
            let artifacts=JSON.parse(localStorage.artifacts);
            let inventory_size=0;

            self.achievements.inventory.forEach(counter => {
                if(artifacts.length > counter.value && !counter.done){
                    counter.done=true;
                    inventory_size=counter.value;
                }
            });

            if(inventory_size != 0){
                self.$notify({
                    group: 'foo',
                    type: 'info',
                    duration: 1500,
                    title: `<h6>New achievement unlocked!</h6> Have over ${inventory_size} artifacts in your inventory.`
                });

                self.$store.commit('artifacts/setAchievements',self.achievements);
            }
        }
    }
}