package com.ftn.model;

import javax.persistence.Entity;

/**
 * Created by Alex on 10/28/16.
 */
@Entity
public class SystemManager extends User {

    public SystemManager() {
        this.setRole(Role.SYSTEM_MANAGER);
    }
}
