using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("notification")]
    public class Notification : BaseEntity<long>
    {
        public string Details { get; set; }
        [Required]
        public string UserIdAwqaf { get; set; }
        [Required]
        public string ContractId { get; set; }
        public DateTime? SentDate { get; set; }
        public DateTime? Date { get; set; }

   

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var notification = obj as Notification;
            if (notification?.Id == null || notification?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, notification.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Notification{" +
                    $"ID='{Id}'" +
                    $", Details='{Details}'" +
                    $", UserIdAwqaf='{UserIdAwqaf}'" +
                    $", ContractId='{ContractId}'" +
                    $", SentDate='{SentDate}'" +
                    $", Date='{Date}'" +
                    "}";
        }
    }
}
