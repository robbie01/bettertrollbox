import styled from "styled-components"

const User = styled.span.attrs(({ color }) => ({
  style: {
    color: color.split(";")[0]
  }
}))`
  color: white;
  line-height: 20px;
`

export default User
