using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("complaint")]
    public class Complaint : BaseEntity<long>
    {
        public long? UserId { get; set; }
        public string UserName { get; set; }
        public string Subject { get; set; }
        public string ComplaintTextBody { get; set; }
        public DateTime? Date { get; set; }
        public string About { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

      
        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var complaint = obj as Complaint;
            if (complaint?.Id == null || complaint?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, complaint.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Complaint{" +
                    $"ID='{Id}'" +
                    $", UserId='{UserId}'" +
                    $", UserName='{UserName}'" +
                    $", Subject='{Subject}'" +
                    $", ComplaintTextBody='{ComplaintTextBody}'" +
                    $", Date='{Date}'" +
                    $", About='{About}'" +
                    $", PhoneNumber='{PhoneNumber}'" +
                    $", Email='{Email}'" +
                    "}";
        }
    }
}
