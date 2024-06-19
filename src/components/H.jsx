export default function H({level = 1, children, ...props}) {
  const _H = 'h' + level
  return (
    <_H {...props}>
      {children}
    </_H>
  )
}