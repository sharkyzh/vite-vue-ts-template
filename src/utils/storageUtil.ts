import { Data, expire, Key, Result, StorageCls } from "@/utils/types/types";
import { Dictionaries } from "@/utils/enums/dictionaries";

export class Storage implements StorageCls {
  //存储接受 key value 和过期时间 默认永久
  public set<T = any>(key: Key, value: T, expire: expire = Dictionaries.permanent) {
    //格式化数据
    const data = {
      value,
      [Dictionaries.expire]: expire,
    };
    //存进去
    localStorage.setItem(key, JSON.stringify(data));
  }

  public get<T = any>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key);
    //读出来的数据是否有效
    if (value) {
      const obj: Data<T> = JSON.parse(value);
      const now = new Date().getTime();
      //有效并且是数字类型 并且过期了 进行删除和提示
      if (typeof obj[Dictionaries.expire] == "number" && obj[Dictionaries.expire] < now) {
        this.remove(key);
        return {
          message: `您的${key}已过期`,
          value: null,
        };
      } else {
        //否则成功返回
        return {
          message: "成功读取",
          value: obj.value,
        };
      }
    } else {
      //否则key值无效
      console.warn("key值无效");
      return {
        message: `key值无效`,
        value: null,
      };
    }
  }

  //删除某一项
  public remove(key: Key) {
    localStorage.removeItem(key);
  }

  //清空所有值
  public clear() {
    localStorage.clear();
  }
}
