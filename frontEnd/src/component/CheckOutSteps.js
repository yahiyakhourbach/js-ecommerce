const CheckOutSteps={
    after_render:()=>{},
    render:(props)=>`
    <div class="checkout-steps container">
        <div class="${props.step1 ? 'active':''}">SignIn</div>
        <div class="${props.step2 ? 'active':''}">Shipping</div>
        <div class="${props.step3 ? 'active':''}">payment</div>
        <div class="${props.step4 ? 'active':''}">Palce Order</div>
    </div>
        `
        
}

export default CheckOutSteps