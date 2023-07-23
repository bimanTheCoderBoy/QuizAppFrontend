import Carousel from 'react-bootstrap/Carousel';

function HeroCorousel() {
    return (
        <Carousel className='mt-3'>
            <Carousel.Item>
                <figure className='text-center'>
                    <img src="https://plus.unsplash.com/premium_photo-1682955296266-4e5f52697a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="First" className='hero-img img-fluid' />
                </figure>
                <Carousel.Caption>
                    <h3>Old Boring Way</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <figure>
                    <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80" alt="Second" className='hero-img img-fluid' />
                </figure>
                <Carousel.Caption>
                    <h3 style={{ color: "#fff" }}>New Interesting Way</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HeroCorousel;