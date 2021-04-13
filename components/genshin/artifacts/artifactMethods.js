export const artifactMethods={
	rerollMainStat(self,from_inventory){
        let artifact;

        if(from_inventory)
            artifact=self.artifacts[self.artifacts.findIndex(artifact => artifact.id === self.artifact_id)];
        else artifact=self.current_artifact;

	    let old_main=artifact.stats.main.name;

	    //SET MAIN STATS BASED ON THE TYPE OF THE ARTIFACT
	    let main_stats=self.main_stats.filter(main => main.types.includes(artifact.info.piece.type)).map(main => main.name);

	    main_stats=main_stats.filter(main => main != old_main).filter(main => !artifact.stats.subs.map(sub => sub.name).includes(main));

	    let random_main=main_stats[Math.floor(Math.random() * main_stats.length)];

	    artifact.stats.main={
	        name: random_main,
	        value: self.main_stats.filter(main => main.name == random_main)[0].values[artifact.info.stars][artifact.info.level]

	    };

	    let new_main=artifact.stats.main.name;

	    artifact.info.rerolls.main.count++;
	    self.current_artifact=artifact;
	    if(from_inventory) self.updateInventory(artifact);

	    self.$notify({
	        group: 'foo',
	        type: 'success',
	        duration: 1000,
	        title: '<h6>Changed main stat from <u>'+old_main+'</u> to <u>'+new_main+'</u></h6>'
	    });
	},
    rerollSubStats(self,from_inventory){
        let artifact;

        if(from_inventory)
            artifact=self.artifacts[self.artifacts.findIndex(artifact => artifact.id === self.artifact_id)];
        else artifact=self.current_artifact;

        let old_subs=artifact.stats.subs.map(sub => sub.name);

        artifact.stats.subs=[];
        artifact.info.level=0;
        artifact.stats.main.value=self.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[artifact.info.stars][artifact.info.level];
        let subs=[];

        self.sub_stats.splice(self.sub_stats.findIndex(sub => sub.name === artifact.stats.main.name),1);

        //SET THE NUMBER OF SUBSTATS
        let sub_rolls;

        switch (artifact.info.stars) {
            case 5: sub_rolls=Math.random() < 0.2 ? 4 : 3; break;
            case 4: sub_rolls=Math.random() < 0.4 ? 3 : 2; break;
            case 3: sub_rolls=Math.random() < 0.8 ? 2 : 1; break;
            case 2: sub_rolls=Math.random() < 0.9 ? 1 : 0; break;
            case 1: sub_rolls=0; break;
        }

        //ROLL RANDOM SUBSTATS
        for(let i=0; i<sub_rolls; i++){
            let random_sub=self.sub_stats[Math.floor(Math.random() * self.sub_stats.length)];

            subs.push({
                name: random_sub.name,
                value: random_sub.values[artifact.info.stars][Math.floor(
                    Math.random() * random_sub.values[artifact.info.stars].length)],
                level: 0
            });
            self.sub_stats.splice(self.sub_stats.findIndex(sub => sub.name === random_sub.name),1);
        }

        artifact.info.rerolls.subs.count++;
        artifact.stats.subs=subs;
        self.current_artifact=artifact;
        self.sub_stats=self.all_subs;
        this.setSubs(self);
        if(from_inventory) self.updateInventory(artifact);

        let new_subs=artifact.stats.subs.map(sub => sub.name);

        self.$notify({
            group: 'foo',
            type: 'success',
            duration: 1000,
            title: '<h6>Changed sub stats from <u>'+old_subs+'</u> to <u>'+new_subs+'</u></h6>'
        });
    },
    add(self,roll_10x){
        let artifacts;

        if(process.client && localStorage.artifacts){
            artifacts=JSON.parse(localStorage.artifacts);

            artifacts.push(self.current_artifact);
            localStorage.setItem('artifacts',JSON.stringify(artifacts));

            self.$store.commit('artifacts/setArtifacts',artifacts.reverse());
        }
        else{
            if(roll_10x) artifacts=[self.current_artifact];

            if(process.client) localStorage.setItem('artifacts',JSON.stringify(artifacts));
            self.$store.commit('artifacts/setArtifacts',artifacts);
        }

        self.$notify({
            group: 'foo',
            type: 'success',
            duration: 1000,
            title: '<h6>Added artifact to inventory!</h6>'
        });

        if(roll_10x){
            self.artifacts.splice(self.artifacts.findIndex(artifact => artifact.id === self.current_artifact.id),1);
            self.current_artifact=self.artifacts[0];
        }
        else self.singleRoll();
    },
    upgrade(self,from_inventory,roll_10x,upgrade_count){
        if(upgrade_count === null) upgrade_count = 1;
        self.upgrades=[];
        self.sub_stats=self.all_subs;
        this.setSubs(self);

        if(!localStorage.max_upgrades) localStorage.setItem('max_upgrades', 0);

        let artifact;

        if(from_inventory)
            artifact=self.artifacts[self.artifacts.findIndex(artifact => artifact.id === self.artifact_id)];
        else artifact=self.current_artifact;

        self.old_main_value=artifact.stats.main.value;

        for(let i=0; i<upgrade_count; i++){
            if(artifact.stats.subs.length === self.max_sub_counts[artifact.info.stars-1]){
                if(artifact.info.level !== artifact.info.max_level){
                    let random_sub=artifact.stats.subs[Math.floor(Math.random() * artifact.stats.subs.length)];

                    let sub_values=self.sub_stats.filter(sub => sub.name === random_sub.name)[0].values[artifact.info.stars];
                    let old_sub_value=random_sub.value;

                    random_sub.value+=sub_values[Math.floor(Math.random() * sub_values.length)];
                    random_sub.level+=1;
                    artifact.info.level+=4;

                    artifact.stats.main.value=self.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[artifact.info.stars][artifact.info.level];

                    if(self.upgrades.filter(upgrade => upgrade.name == random_sub.name).length != 0){
                        self.upgrades[self.upgrades.findIndex(upgrade => upgrade.name == random_sub.name)].new_value=Math.round(random_sub.value*100)/100;
                    }
                    else{
                        self.upgrades.push({
                            name: random_sub.name,
                            old_value: Math.round(old_sub_value*100)/100,
                            new_value: Math.round(random_sub.value*100)/100
                        });
                    }
                }
            }
            else{
                self.sub_stats.splice(self.sub_stats.findIndex(sub => sub.name === artifact.stats.main.name),1);

                let random_sub=self.sub_stats[Math.floor(Math.random() * self.sub_stats.length)];

                let isSubFree=artifact.stats.subs.filter(sub => sub.name === random_sub.name).length === 0 ? true : false;

                while(!isSubFree){
                    random_sub=self.sub_stats[Math.floor(Math.random() * self.sub_stats.length)];

                    if(artifact.stats.subs.filter(sub => sub.name === random_sub.name).length === 0)
                        isSubFree=true;
                }

                let random_sub_value=random_sub.values[artifact.info.stars][Math.floor(
                        Math.random() * random_sub.values[artifact.info.stars].length)];

                artifact.stats.subs.push({
                    name: random_sub.name,
                    value: random_sub_value,
                    level: 0
                });

                self.upgrades.push({
                    name: random_sub.name,
                    old_value: null,
                    new_value: Math.round(random_sub_value*100)/100
                });

                artifact.info.level+=4;
                artifact.stats.main.value=self.main_stats.filter(main => main.name == artifact.stats.main.name)[0].values[artifact.info.stars][artifact.info.level];
            }
        }

        if(artifact.info.level === artifact.info.max_level){
            self.max_upgrades++;
            localStorage.setItem('max_upgrades', self.max_upgrades);
        }

        self.upgrades.reverse();

        if(roll_10x && self.show) self.showUpgrades();
        if(from_inventory) self.updateInventory(artifact);
        if(!roll_10x && !from_inventory && self.roll_settings.show_upgrades) self.openModal();
    },
	setSubs(self){
        self.all_subs=[
        {
            "name": "HP",
            "values": {
                "1": [24],
                "2": [50,61,72],
                "3": [100,115,129,143],
                "4": [167,191,215,239],
                "5": [209,239,269,299]
            }
        },
        {
            "name": "ATK",
            "values": {
                "1": [2],
                "2": [3,4,5],
                "3": [7,8,9],
                "4": [11,12,14,16],
                "5": [14,16,18,19]
            }
        },
        {
            "name": "DEF",
            "values": {
                "1": [2],
                "2": [4,5,6],
                "3": [8,9,10,11],
                "4": [13,  15,  17,  19],
                "5": [16,  19,  21,  23]
            }
        },
        {
            "name": "Elemental Mastery",
            "values": {
                "1": [6],
                "2": [7,  8,  9],
                "3": [10,  11,  13,  14],
                "4": [13,  15,  17,  19],
                "5": [16,  19,  21,  23]
            }
        },
        {
            "name": "HP%",
            "values": {
                "1": [1.2,  1.5],
                "2": [1.6,  2,  2.3],
                "3": [2.5,  2.8,  3.2,  3.5],
                "4": [3.3,  3.7,  4.2,  4.7],
                "5": [4.1,  4.7,  5.3,  5.8]
            }
        },
        {
            "name": "ATK%",
            "values": {
                "1": [1.2,  1.5],
                "2": [1.6,  2,  2.3],
                "3": [2.5,  2.8,  3.2,  3.5],
                "4": [3.3,  3.7,  4.2,  4.7],
                "5": [4.1,  4.7,  5.3,  5.8]
            }
        },
        {
            "name": "DEF%",
            "values": {
                "1": [1.8],
                "2": [2,  2.5,  2.9],
                "3": [3.1,  3.5,  3.8,  4.4],
                "4": [4.1,  4.7,  5.3,  5.8],
                "5": [5.1,  5.8,  6.6,  7.3]
            }
        },
        {
            "name": "Energy Recharge%",
            "values": {
                "1": [1.3,  1.6],
                "2": [1.8,  2.2,  2.6],
                "3": [2.7,  3.1,  3.5,  3.9],
                "4": [3.6,  4.1,  4.7,  5.2],
                "5": [4.5,  5.2,  5.8,  6.5]
            }
        },
        {
            "name": "CRIT Rate%",
            "values": {
                "1": [0.8,  1.6],
                "2": [1.1,  1.3,  1.6],
                "3": [1.6,  1.9,  2.1,  2.3],
                "4": [2.2,  2.5,  2.8,  3.1],
                "5": [2.7,  3.1,  3.5,  3.9]
            }
        },
        {
            "name": "CRIT DMG%",
            "values": {
                "1": [1.6],
                "2": [2.2,  2.6,  3.1],
                "3": [3.3,  3.7,  4.2,  4.7],
                "4": [4.4,  5,  5.6,  6.2],
                "5": [5.4,  6.2,  7,  7.8]
            }
        }
    ];
    }
}