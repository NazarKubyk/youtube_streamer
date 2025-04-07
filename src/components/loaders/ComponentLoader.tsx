import { cn } from "@/helpers/cn";
import { FC } from "react";

interface ComponentLoaderProps {
    componentSize?: string;
    spinerSize?: string;
}

const ComponentLoader: FC<ComponentLoaderProps> = ({
    componentSize = "size-full",
    spinerSize = "size-20",
}) => {
    return (
        <div className={cn("flex items-center justify-center", componentSize)}>
            <div
                className={cn("animate-spin rounded-full border-y-8 border-green-500", spinerSize)}
            />
        </div>
    );
};

export default ComponentLoader;
