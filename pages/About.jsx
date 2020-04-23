
export class About extends React.Component {

    constructor() {
        super();
        this.trollLink = React.createRef();
        this.trollAnimating = false;
    }


    state = {

        
    }

    componentDidMount() {
        console.log(this.trollLink);

        this.trollLink.current.focus()
    }

    trollAnimations = () => {

        if(this.trollAnimating) return;

        var elTroll = this.trollLink.current;
        console.log(elTroll);
        
        this.trollAnimating = true;
    
        var animationsBank = ['rotate', 'rotateY', 'rotateX', 'rotateZ'];
    
        elTroll.style.transform = `${animationsBank[Math.floor(Math.random() * animationsBank.length)]}(${Math.floor(Math.random() * 180)}deg)`;
    
        setTimeout(() => {
            elTroll.style.transform = '';
            this.trollAnimating = !this.trollAnimating;
        }, 300);
    }


    render() {

        return (

            <section className="about-section container flex column align-center space-center">
                <p className="about-header">About Us</p>
                <p ref={this.trollLink} onMouseEnter={this.trollAnimations} className="about-troll">Shhhh.... It's a <a target="_blank" href="https://taltara.github.io/MineSweeper-JS/">secret</a> :)</p>

            </section>

        );

    }


}
