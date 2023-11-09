import React from 'react'

function About() {
  
  return (
    <> 
    <div>About Us  <br />
      <section id="team" class="team">

<h1 class="heading"><br/> Our Team</h1>

<div class="row">

<div class="card">
  <div class="image">
    <img src={require("../about/name1.png")}/>
  </div>
  <div class="info">
    <h4>Name : </h4>
    <h4>Full Stack-Web Developer</h4>
   
  </div>
</div>

<div class="card">
  <div class="image">
    <img  src={require("../about/name2.png")}/>
  </div>
  <div class="info">
    <h4>Name : </h4>
    <h4>Full Stack-Web Developer</h4>
    
  </div>
</div>


</div>

</section>

    </div>
    </>
  )
}

export default About