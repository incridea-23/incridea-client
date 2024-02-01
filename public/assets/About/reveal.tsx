import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const Reveal = ({
	children,
	classes,
}: {
	children: JSX.Element;
	classes: undefined | string;
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const control = useAnimation();

	useEffect(() => {
		isInView && control.start("visible").catch((err) => console.log(err));
	}, [isInView]);


	return (
		<div
			ref={ref}
			style={{ position: "relative" }}
			className={`${classes}`}
		>
			<motion.div
				variants={{
					hidden: { opacity: 0, y: 75 },
					visible: { opacity: 1, y: 0 },
				}}
				initial="hidden"
				animate={control}
				transition={{
					duration: 0.65,
					delay: 0.25,
				}}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default Reveal;
