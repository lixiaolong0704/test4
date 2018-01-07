export default class Test{

}


class OrderLine {
    constructor() {

        var n = this.arr[0]

        autorun(() => {
            // console.log(this.price);
            // console.log(this.arr[0].name);
            console.log('......');
            console.log(n.name + n.sex);

        })
    }

    @observable price = 0;
    @observable amount = 1;
    @observable arr: any = [{name: 'zhansan', sex: 2}, {age: 24}];


    @action
    change() {
        this.arr[0].name = "lisi";
        this.arr[0].sex = 5;


    }

    @computed
    get total() {
        return this.price * this.amount;
    }

}


var t = new Test();
// t.p='zhansan';


var a = new OrderLine();
a.change();
// a.price=24;
// var bbb= a.arr[0];
// bbb.name='lisi';
// bbb.sex =3;


var testHtml = `
    <div>
     <div>fuck you ok ?</div>
     <div>not ok cc mm</div>
    
</div>
   
`;