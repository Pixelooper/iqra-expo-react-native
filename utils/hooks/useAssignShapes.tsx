
import { useMemo } from "react";
import { shapes } from "@/constants";
import { surah } from "@/types/type";

const useAssignShapes = (data: surah[]) => {
    return useMemo(() => {
        return data.map((item) => ({
            ...item,
            shape: shapes[Math.floor(Math.random() * shapes.length)],
        }));
    }, [data]);
};

export default useAssignShapes;