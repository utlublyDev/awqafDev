
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class RedeemUpdateCommand : IRequest<Redeem>
    {
        public Redeem Redeem { get; set; }
    }
}
