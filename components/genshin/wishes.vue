<template>
    <div>
        <div class="text-center my-2">
            <button
            @click="wish(1)"
            class="btn btn-primary d-inline mx-1 btn-sm rounded-0">
                Single wish
            </button>

            <button
            @click="wish(10)"
            class="btn btn-primary d-inline mx-1 btn-sm rounded-0">
                10x wish
            </button>

            <button
            @click="wish(0)"
            class="btn btn-primary d-inline mx-1 btn-sm rounded-0">
                5-star wish
            </button>

            <ui-textbox
            class="d-inline-block p-0 m-0 text-light"
            style="max-width: 20%"
            placeholder="Number of wishes"
            v-model.trim="wish_count"
            @keydown-enter="wish(wish_count)"></ui-textbox>

            <button
            @click="wish(wish_count)"
            class="btn btn-primary d-inline mx-1 btn-sm rounded-0">
                Wish
            </button>

            <button
            @click="clear"
            class="btn btn-primary d-inline mx-1 btn-sm rounded-0">
                Clear
            </button>
        </div>

        <div style="max-height:75vh;overflow-y: auto;">
            <div 
            v-for="(wish,i) in wishes"
            :key="i"
            style="max-height: 200px;overflow-y: auto;"
            class="d-inline-block col-12 col-sm-6 col-md-4 p-0 border border-light text-light">
                <table
                class="table w-100 text-light">
                    <tr>
                        <th>
                            3 stars
                        </th>

                        <th>
                            4 stars
                        </th>

                        <th>
                            5 stars
                        </th>

                        <th>
                            Overall
                        </th>
                    </tr>

                    <tr>
                        <td>
                            {{ wish.filter(wish => wish.stars === 3).length }}
                        </td>

                        <td :class="{'text-primary font-weight-bold':wish.filter(wish => wish.stars === 4).length > 0}">
                            {{ wish.filter(wish => wish.stars === 4).length }}
                        </td>

                        <td :class="{'text-danger font-weight-bold':wish.filter(wish => wish.stars === 5).length > 0}">
                            {{ wish.filter(wish => wish.stars === 5).length }}
                        </td>

                        <td>
                            {{
                                wish.filter(wish => wish.stars === 3).length+
                                wish.filter(wish => wish.stars === 4).length+
                                wish.filter(wish => wish.stars === 5).length
                            }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div style="height:20%;">
            <table class="table w-100 text-light">
                <tr>
                    <th>
                        3 stars
                    </th>

                    <th>
                        4 stars
                    </th>

                    <th>
                        5 stars
                    </th>

                    <th>
                        Overall
                    </th>
                </tr>

                <tr>
                    <td>
                        {{ stats.star_3 }}
                    </td>

                    <td class="font-weight-bold text-primary">
                        {{ stats.star_4 }}
                    </td>

                    <td class="font-weight-bold text-danger">
                        {{ stats.star_5 }}
                    </td>

                    <td>
                        {{ stats.overall }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default{
     name: 'wishes',
    data(){
        return {
            wishes: [],
            stats: {
                star_3: 0,
                star_4: 0,
                star_5: 0,
                overall: 0
            },
            wish_count: 0
        }
    },
    methods: {
        clear(){
            this.wishes=[];
            this.stats={
                star_3: 0,
                star_4: 0,
                star_5: 0,
                overall: 0
            };
            this.wish_count=0;
        },
        wish(num){
            if(num === 1){
                this.singleWish()
            }
            else if(num === 0){
                this.fiveStarWish()
            }
            else if(this.wish_count > 0){
                this.wishInput()
            }
            else{
                this.wish10x()
            }

            this.stats.overall=this.stats.star_3+this.stats.star_4+this.stats.star_5;
        },
        singleWish(){
            let wishes=[];
            let rng = Math.random();

            if (rng <= 0.944){
                wishes.push({
                    stars: 3
                });
                this.stats.star_3++
            }
            else if (rng>0.944 && rng<0.994){
                wishes.push({
                    stars: 4
                });
                this.stats.star_4++
            }
            else{
                wishes.push({
                    stars: 5
                });
               this.stats.star_5++
            }

            this.wishes.push(wishes);
        },
        wish10x(){
            let wishes=[];

            for(let i=0; i<10; i++){
                let rng = Math.random();

                if (rng <= 0.944){
                    wishes.push({
                        stars: 3
                    });

                    this.stats.star_3++
                 }
                else if (rng>0.944 && rng<0.994){
                    wishes.push({
                        stars: 4
                    });

                    this.stats.star_4++
                }
                else{
                    wishes.push({
                        stars: 5
                    });

                    this.stats.star_5++
                }
            }

            this.wishes.push(wishes);
        },
        wishInput(){
            let wishes=[];

            for(let i=0; i<this.wish_count; i++){
                let rng = Math.random();

                if (rng <= 0.944){
                    wishes.push({
                        stars: 3
                    });

                    this.stats.star_3++
                 }
                else if (rng>0.944 && rng<0.994){
                    wishes.push({
                        stars: 4
                    });

                    this.stats.star_4++
                }
                else{
                    wishes.push({
                        stars: 5
                    });

                    this.stats.star_5++
                }
            }

            this.wishes.push(wishes);
        },
        fiveStarWish(){
            let s5=0;
            let wishes=[];

            while(s5 != 1){
                for(let i=0; i<10; i++){
                    let rng = Math.random();

                    if (rng <= 0.944){
                        wishes.push({
                            stars: 3
                        })
                        this.stats.star_3++
                     }
                    else if (rng>0.944 && rng<0.994){
                        wishes.push({
                            stars: 4
                        })
                        this.stats.star_4++
                    }
                    else{
                        wishes.push({
                            stars: 5
                        });
                       this.stats.star_5++;
                       s5++;
                    }
                    break;
                }
            }

            this.wishes.push(wishes);
        }
    }
}
</script>