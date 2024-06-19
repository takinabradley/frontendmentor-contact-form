export default function Alert({children, ...rest}) {
  return <div role="alert" {...rest}>{children}</div>
}