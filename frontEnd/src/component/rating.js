 const rating={
   render:(props) => {
        if(props.value ===""){
            return `<div><div>`
        }
        return`
        <div class="rating">
          <span>
                 ${props.value>=1 ? `<i class='bx bxs-star'></i>`
                : `${props.value>=0.5 ? `<i class='bx bxs-star-half' ></i>`
                : `<i class='bx bx-star' ></i>` } ` }
          </span>
          <span>${
            props.value>=2 ? '<i class="bx bxs-star"></i>'
            : `${props.value>=1.5 ?`<i class='bx bxs-star-half' ></i> `
            :`<i class='bx bx-star' ></i>` } `}
        </span>

        <span>${props.value>=3 ? `<i class='bx bxs-star'></i> `  
            : `${props.value>=2.5 ?  `<i class='bx bxs-star-half' ></i>`
            : `<i class='bx bx-star' ></i>`}`  }
         </span>

         <span>${props.value>=4 ? `<i class='bx bxs-star'></i> `  
            : `${props.value>=3.5 ?  `<i class='bx bxs-star-half' ></i>`
            : `<i class='bx bx-star' ></i>`}`  }
      </span>
      <span>${props.value>=5 ? `<i class='bx bxs-star'></i> `  
            : `${props.value>=4.5 ?  `<i class='bx bxs-star-half' ></i>`
            : `<i class='bx bx-star' ></i>`}`  }
      </span>

        <span>  ${props.text || ''} </span>
        </div>
        
        `

    }
}

export default rating