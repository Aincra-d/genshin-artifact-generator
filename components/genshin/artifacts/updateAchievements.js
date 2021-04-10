export function updateAchievements(self){
    let new_achievements=[];

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

                    if(new_achievements.map(achievement => achievement.name).includes(new_achievement.name)){
                        new_achievements[new_achievements.findIndex(achievement => achievement.name == new_achievement.name)].value=new_achievement.value;
                    }
                    else{
                        new_achievements.push(new_achievement)
                    }
                }
            }
        });
    });

    if(new_achievements.length > 0){
        new_achievements.forEach(achievement => {
            self.$notify({
                group: 'foo',
                type: 'info',
                duration: 5000,
                title: `<h6>New achievement unlocked!</h6> You have successfully upgraded a <b>${achievement.name}</b> sub stat over <b>${achievement.value}`+(achievement.name.includes('%') ? '%' : '')+'</b>'
            });
        });
    }

    self.$store.commit('artifacts/setAchievements',self.achievements);
    // localStorage.setItem('achievements',JSON.stringify(self.achievements));
}